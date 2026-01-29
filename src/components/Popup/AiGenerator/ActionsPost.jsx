import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import EmojiPicker from "emoji-picker-react";

import create from "@/assets/create.svg";
import ImageIcon from "@/icons/ImageIcon";
import PaperIcon from "@/icons/PaperIcon";
import SmileyIcon from "@/icons/SmileyIcon";
import FatIcon from "@/icons/FatIcon";
import ItalicIcon from "@/icons/ItalicIcon";
import UnderlinedIcon from "@/icons/UnderlinedIcon";
import CrossedIcon from "@/icons/CrossedIcon";
import LinkIcon from "@/icons/LinkIcon";
import EyeIcon from "@/icons/EyeIcon";
import HiddenIcon from "@/icons/HiddenIcon";
import MonoIcon from "@/icons/MonoIcon";
import QuoteIcon from "@/icons/QuoteIcon";
import AiGeneratorIcon from "@/icons/AiGeneratorIcon";

import MediaPopup from "@/components/MediaPopup";
import BtnBase from "@/shared/BtnBase";

import { useCreatePost } from "@/lib/posts/useCreatePost";
import { useSendPostToChannel } from "@/lib/posts/useSendPostToChannel";
import { useUpdatePost } from "@/lib/posts/useUpdatePost";
import { useAddPostImages } from "@/lib/posts/useAddPostImages";
import getCleanSummaryForServer from "@/lib/getCleanSummaryForServer";

import { usePostsStore } from "@/store/postsStore";
import { usePopupStore } from "@/store/popupStore";
import { useNotificationStore } from "@/store/notificationStore";

const ActionsPost = ({ post, textRefs, caretRanges, channelId, telegramId }) => {
	const [savingPosts, setSavingPosts] = useState({});
	const [publishingPosts, setPublishingPosts] = useState({});
	const [emojiPostId, setEmojiPostId] = useState(null);
	const [mediaPopupId, setMediaPopupId] = useState(null);
	const { popup, changeContent } = usePopupStore();
	const { addNotification } = useNotificationStore();

	const {
		posts,
		setSelectedPost,
		removePost,
		updatePost,
		addImages,
		postProgress,
		imageProgress,
		getPostChannel,
		generatePostWithAI,
		generateImageWithAI
	} = usePostsStore();

	const { mutate: createPostMutation, isPending: createPostPending } = useCreatePost();
	const { mutate: sendPost, isPending: isSendPending } = useSendPostToChannel();
	const { mutate: updatePostMutation, isPending: updatePending } = useUpdatePost();
	const { mutate: addImagesToPost } = useAddPostImages();

	const handleAddImages = (postId, files) => {
		const post = posts.find(p => p.postId === postId);
		if (!post) return;

		const fileArray = Array.from(files);
		addImages(postId, fileArray);

		if (post.serverId) {
			addImagesToPost({ postId: post.serverId, images: fileArray }, {
				onSuccess: () => addNotification("Изображения успешно загружены на сервер", "success"),
				onError: (err) => addNotification(err.message || "Ошибка загрузки изображений на сервер", "error"),
			});
		}
	};

	const handleSavePost = (post) => {
		if (!post.title || !post.summary) {
			addNotification("Пост должен иметь заголовок и текст", "info");
			return;
		}
		if (!post.time?.date) {
			return addNotification("Выберите дату публикации", "info");
		}
		const postChannelId =
			popup?.data?.channelId ||
			(post.serverId ? popup?.data?.channelId : null) ||
			usePostsStore.getState().channelMap[post.postId]

		if (!postChannelId) {
			return addNotification("Выберите канал публикации", "info");
		}

		const [hoursStr, minutesStr] = post.time?.time?.split(":") || ["00", "00"];
		const hours = parseInt(hoursStr);
		const minutes = parseInt(minutesStr);
		const baseDate = post.time?.date ? new Date(post.time.date) : new Date();

		baseDate.setUTCHours(hours);
		baseDate.setUTCMinutes(minutes);
		baseDate.setUTCSeconds(0);
		baseDate.setUTCMilliseconds(0);

		const publishedAt = baseDate.toISOString();

		setSavingPosts(prev => ({ ...prev, [post.postId]: true }));

		const basePayload = {
			title: post.title,
			text: post.text,
			channelId: postChannelId,
			publishedAt,
			calendarScheduledAt: publishedAt,
			summary: getCleanSummaryForServer(post.summary),
			url: post.url,
		};

		if (!post.serverId) {
			createPostMutation({ ...basePayload, images: post.images.filter(img => typeof img === "string") }, {
				onSuccess: (createdPost) => {
					const serverPostId = createdPost.id;
					const localFiles = post.images.filter(img => img instanceof File);
					if (localFiles.length > 0) {
						addImagesToPost(
							{ postId: serverPostId, images: localFiles },
							{
								onSuccess: () => addNotification("Изображения успешно загружены на сервер", "success"),
								onError: (err) => addNotification(err.message || "Ошибка загрузки изображений на сервер", "error"),
							}
						);
					}
					removePost(post.postId);
					addNotification("Пост успешно сохранен", "success");
				},
				onError: (err) => addNotification(err.message || "Ошибка сохранения поста", "error"),
				onSettled: () => {
					setSavingPosts(prev => ({ ...prev, [post.postId]: false }));
				}
			});
		} else {
			updatePostMutation({ postId: post.serverId, postData: basePayload }, {
				onSuccess: () => {
					removePost(post.postId);
					addNotification("Пост успешно обновлен", "update");
				},
				onError: (err) => addNotification(err.message || "Ошибка обновления поста", "error"),
				onSettled: () => {
					setSavingPosts(prev => ({ ...prev, [post.postId]: false }));
				}
			});
		}
	};
	const insertLinkAtCursor = (postId, url) => {
		const el = textRefs.current[postId];
		if (!el || !url) return;

		el.focus();

		let selection = document.getSelection();
		let range = caretRanges.current[postId] ||
			(selection?.rangeCount ? selection.getRangeAt(0) : null);

		if (!range || !el.contains(range.startContainer)) {
			range = document.createRange();
			range.selectNodeContents(el);
			range.collapse(false);
		}

		const br1 = document.createElement("br");
		const br2 = document.createElement("br");
		const icon = document.createElement("span");
		icon.textContent = "🔗";

		const link = document.createElement("a");
		link.href = url;
		link.target = "_blank";
		link.rel = "noopener noreferrer";
		link.textContent = "Источник";

		const fragment = document.createDocumentFragment();
		fragment.appendChild(br1);
		fragment.appendChild(br2);
		fragment.appendChild(icon);
		fragment.appendChild(link);

		range.insertNode(fragment);

		range.setStartAfter(link);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);

		caretRanges.current[postId] = range.cloneRange();

		updatePost(postId, {
			text: el.innerText
		});
	};
	const insertEmojiAtCursor = (emoji, postId) => {
		const el = textRefs.current[postId];
		if (!el) return;

		el.focus();

		let selection = document.getSelection();
		let range = caretRanges.current[postId] || (selection?.rangeCount ? selection.getRangeAt(0) : null);

		if (!range || !el.contains(range.startContainer)) {
			const endRange = document.createRange();
			endRange.selectNodeContents(el);
			endRange.collapse(false);
			range = endRange;
		}

		range.deleteContents();
		const node = document.createTextNode(emoji);
		range.insertNode(node);
		range.setStartAfter(node);
		range.collapse(true);

		selection = document.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);

		caretRanges.current[postId] = range.cloneRange();

		updatePost(postId, { summary: el.innerHTML });
	};
	const handlePublishNow = (post) => {
		if (!post.summary) return addNotification("Нельзя публиковать пустой пост", "info");

		const postChannelId = channelId || usePostsStore.getState().channelMap[post.postId];
		if (!postChannelId) return addNotification("Выберите канал для публикации поста", "info");

		setPublishingPosts(prev => ({ ...prev, [post.postId]: true }));

		const publish = (serverPostId) => {
			sendPost(
				{ postId: serverPostId, channelId: postChannelId, channelTelegramId: telegramId },
				{
					onSuccess: () => {
						addNotification("Пост успешно опубликован", "success");
					},
					onError: (err) => addNotification(err.message || "Ошибка публикации поста", "error"),
					onSettled: () => {
						setPublishingPosts(prev => ({ ...prev, [post.postId]: false }));
					}
				}
			);
		};

		if (!post.serverId) {
			const urlImages = post.images.filter(img => typeof img === "string");
			const localFiles = post.images.filter(img => img instanceof File);
			const payload = {
				title: post.title,
				text: post.text,
				images: urlImages,
				channelId: postChannelId,
				publishedAt: new Date().toISOString(),
				summary: getCleanSummaryForServer(post.summary),
				url: post.url,
			};

			createPostMutation(payload, {
				onSuccess: (createdPost) => {
					const serverPostId = createdPost.id;

					if (localFiles.length > 0) {
						addImagesToPost(
							{ postId: serverPostId, images: localFiles },
							{
								onSuccess: () => publish(serverPostId),
								onError: (err) => addNotification(err.message || "Ошибка загрузки изображений на сервер", "error"),
							}
						);
					} else {
						publish(serverPostId);
					}
				},
				onError: (err) => {
					addNotification(err.message || "Ошибка публикации поста", "error");
					setPublishingPosts(prev => ({ ...prev, [post.postId]: false }));
				},
			});
			return;
		}
		publish(post.serverId);
	};

	const handleRemovePost = (postId) => {
		if (posts.length > 1) {
			removePost(postId);
		} else {
			updatePost(postId, {
				title: "",
				summary: "",
				text: "",
				images: [],
				imagesUrls: [],
				url: "",
			});
		}
	};
	const wrapSelectionToggle = (postId, wrapperTag, className) => {
		const el = textRefs.current[postId];
		if (!el) return;

		el.focus();
		const selection = document.getSelection();
		let range = caretRanges.current[postId] || (selection?.rangeCount ? selection.getRangeAt(0) : null);
		if (!range || !el.contains(range.startContainer)) return;

		let container = range.commonAncestorContainer;
		if (container.nodeType === 3) container = container.parentNode;

		const existingWrapper = container.closest(wrapperTag);

		const forbiddenMix = {
			"code": ["code", "blockquote", "strike", "tg-spoiler"],
			"blockquote": ["code", "blockquote", "strike", "tg-spoiler"],
			"tg-spoiler": ["code", "blockquote", "strike"]
		};

		const checkForbidden = (wrapperTag) => {
			const tagsToCheck = forbiddenMix[wrapperTag] || [];
			for (const tag of tagsToCheck) {
				if (container.closest(tag)) return true;
			}
			return false;
		};

		if (checkForbidden(wrapperTag)) return;

		if (existingWrapper && el.contains(existingWrapper)) {
			const parent = existingWrapper.parentNode;
			while (existingWrapper.firstChild) {
				parent.insertBefore(existingWrapper.firstChild, existingWrapper);
			}
			parent.removeChild(existingWrapper);
		} else {
			const fragment = range.extractContents();
			const wrapper = document.createElement(wrapperTag);
			if (className) wrapper.className = className;
			wrapper.appendChild(fragment);
			range.insertNode(wrapper);
			range.selectNode(wrapper);
		}

		range.collapse(false);
		selection.removeAllRanges();
		selection.addRange(range);
		caretRanges.current[postId] = range.cloneRange();

		updatePost(postId, { summary: el.innerHTML });
	};

	const formatMonospace = (postId) => wrapSelectionToggle(postId, "code", "styled-code");
	const formatQuote = (postId) => wrapSelectionToggle(postId, "blockquote", "styled-quote");
	const formatHidden = (postId) => wrapSelectionToggle(postId, "tg-spoiler", "styled-spoiler");

	const formatText = command => {
		document.execCommand(command, false, null);
	};

	return (
		<ItemActions>
			<ActionsLeft>
				<ItemAI>
					<BtnBase $padding="0" $color="#336CFF" $bg="transparent" onClick={() => generatePostWithAI(post.postId, channelId || getPostChannel(post.postId))}>
						<AiGeneratorIcon color="#336CFF" />
						{postProgress[post.postId] != null && postProgress[post.postId] < 100 ? `Генерация с AI... ${postProgress[post.postId]}%` : "Написать с AI"}
					</BtnBase>

					<BtnBase $padding="0" $color="#FF7F48" $bg="transparent" onClick={() => generateImageWithAI(post.postId, post.summary)}>
						<img src={create} alt="create icon" />
						{imageProgress[post.postId] != null && imageProgress[post.postId] < 100 ? `Генерация фото с AI... ${imageProgress[post.postId]}%` : "Создать фото с AI"}
					</BtnBase>
				</ItemAI>
				<ItemActionsAdd>
					<div>
						<ImageIcon
							color="#6A7080"
							hoverColor="#FFFFFF"
							onClick={() => setMediaPopupId(prev => prev === post.postId ? null : post.postId)}
						/>
						{mediaPopupId === post.postId && (
							<MediaPopup postId={post.postId} />
						)}
					</div>
					<input type="file" accept="image/*" multiple style={{ display: "none" }} id={`file-input-${post.postId}`} onChange={e => { if (e.target.files?.length) handleAddImages(post.postId, e.target.files); }} />
					<PaperIcon
						color="#6A7080"
						hoverColor="#FFFFFF"
						onClick={() => document.getElementById(`file-input-${post.postId}`).click()}
					/>
					<div>
						<SmileyIcon
							color="#6A7080"
							hoverColor="#FFFFFF"
							onClick={() => setEmojiPostId(prev => prev === post.postId ? null : post.postId)}
						/>
						{emojiPostId === post.postId && (
							<div style={{ position: "absolute", zIndex: 1000 }}>
								<EmojiPicker onEmojiClick={emojiData => { insertEmojiAtCursor(emojiData.emoji, post.postId); setEmojiPostId(null); }} theme="dark" locale="ru" />
							</div>
						)}
					</div>
					<FatIcon
						color="#6A7080"
						hoverColor="#FFFFFF"
						onClick={() => formatText("bold")}
					/>
					<ItalicIcon
						color="#6A7080"
						hoverColor="#FFFFFF"
						onClick={() => formatText("italic")}
					/>
					<UnderlinedIcon
						color="#6A7080"
						hoverColor="#FFFFFF"
						onClick={() => formatText("underline")}
					/>
					<CrossedIcon
						color="#6A7080"
						hoverColor="#FFFFFF"
						onClick={() => formatText("strikeThrough")}
					/>
					<MonoIcon
						color="#6A7080"
						hoverColor="#FFFFFF"
						onClick={() => formatMonospace(post.postId)}
					/>
					<QuoteIcon
						color="#6A7080"
						hoverColor="#FFFFFF"
						onClick={() => formatQuote(post.postId)}
					/>
					<HiddenIcon
						color="#6A7080"
						hoverColor="#FFFFFF"
						onClick={() => formatHidden(post.postId)}
					/>
					<LinkIcon
						color="#6A7080"
						hoverColor="#FFFFFF"
						onClick={() =>
							changeContent("enter_link", "popup_window", {
								onSave: (url) => {
									const cleanUrl = url?.trim() || null;
									if (!cleanUrl) return;

									updatePost(post.postId, {
										url: cleanUrl,
									});

									insertLinkAtCursor(post.postId, cleanUrl);
								},
							})
						}
					/>
					<ActionsAddBlock onClick={() => setSelectedPost(post)}>
						<EyeIcon />
					</ActionsAddBlock>
				</ItemActionsAdd>
			</ActionsLeft>
			<ButtonsAll>
				<ButtonsMainTop>
					<BtnBase $padding="21px 22px" $color="#EF6284" $bg="#241E2D" onClick={() => handleRemovePost(post.postId)}>Отменить</BtnBase>
					<BtnBase $padding="21px 22px" $border $bg="transparent" $color="#6A7080" onClick={() => changeContent("change_time", "popup_window", { postId: post.postId })}>Изменить время</BtnBase>
					<BtnBase
						$padding="21px 22px"
						$color="#336CFF"
						$bg="#161F37"
						onClick={() => handleSavePost(post)}
						disabled={savingPosts[post.postId]}
					>
						{savingPosts[post.postId] ? "Сохраняем..." : "Сохранить"}
					</BtnBase>
				</ButtonsMainTop>
				<BtnBase
					$padding="21px 18px"
					$border
					$width="100%"
					$bg="transparent"
					$color="#6A7080"
					onClick={() => handlePublishNow(post)}
					disabled={publishingPosts[post.postId]}
				>
					{publishingPosts[post.postId] ? "Публикация..." : "Опубликовать сейчас"}
				</BtnBase>
			</ButtonsAll>
		</ItemActions>
	)
}

const ItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
`
const ActionsLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-bottom: 20px;
`
const ItemAI = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;  
  gap: 24px 40px;
  p {
    display: flex;
    align-items: center;  
    gap: 16px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
  }
`
const ItemActionsAdd = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px 24px;
  @media(max-width: 480px) {
    gap: 24px;
  }
  img {
    cursor: pointer;
  }
`
const ActionsAddBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6a7080;
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }

  span {
    user-select: none;
  }
`;

const ButtonsAll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media(max-width: 2000px) {
    flex-direction: column;
    position: absolute;
    bottom: -150px;
    right: 0;
  } 
  @media(max-width: 480px) {
    bottom: -220px;
  } 
`;
const ButtonsMainTop = styled.div`
  display: flex;
  gap: 8px;

  @media(max-width: 480px) {
    flex-wrap: wrap;
    button {
      flex: auto;
    }
  } 
`;

export default ActionsPost