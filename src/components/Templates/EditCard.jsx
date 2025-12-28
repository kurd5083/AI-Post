import styled from "styled-components";
import { useState } from "react";
import BtnBase from "@/shared/BtnBase";
import copy from "@/assets/copy.svg";
import edit from "@/assets/templates/edit.svg";
import icon from "@/assets/templates/icon.svg";
import InputPlus from "@/shared/InputPlus";
import BlocksItems from "@/shared/BlocksItems";

const EditCard = ({ template, onSave }) => {
	const [title, setTitle] = useState(template.title);
  const [content, setContent] = useState(template.content);
	const [hashtags, setHashtags] = useState(template.hashtags);
  const [hashtag, setHashtag] = useState('');
  const handleSave = () => {
    onSave({
      ...template,
      title,
      content,
      hashtags
    });
  };
	return (
		<CardContainer>
      <CardHead>
        <img src={icon} alt={template.title} width={24} height={20} />
        <CardInput
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </CardHead>

      <CardTextarea>
        <Textarea
          placeholder="Заполните текст"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </CardTextarea>

      <CardBlock>
        <InputPlus
          title="ХЕШТЕГИ"
          placeholder="Ключевое слово"
          bg="#2B243C"
          color="#FF55AD"
          fs="16px"
          padding="16px"
					value={hashtag}
          onChange={setHashtag}
          onSubmit={() => {
            if (!hashtag.trim()) return;

            setHashtags((prev) => [...prev, hashtag]);
            setHashtag("");
          }}
        />
        <BlocksItems 
					items={hashtags.map((h, index) => ({ value: h, id: index }))} 
					color="#EF6284" 
					onRemove={(id) => {
          	setHashtags(hashtags.filter((h) => h.id !== id));
          }}
				/>
      </CardBlock>

      <CardBtns>
        <BtnBase
          $padding="23px"
          $bg="#336CFF"
          $color="#D6DCEC"
          onClick={handleSave}
        >
          Сохранить
        </BtnBase>
        <ButtonCopy>
          <img src={copy} alt="copy icon" width={14} height={16} />
        </ButtonCopy>
        <ButtonEdit>
          <img src={edit} alt="edit icon" width={18} height={16} />
        </ButtonEdit>
      </CardBtns>
    </CardContainer>
	)
}
const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`

const CardHead = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 16px;
	margin-top: 30px;

	img {
		margin-top: 8px;
	}
`
const CardInput = styled.input`
  border: none;
  width: 100%;
  color: #D6DCEC;
  font-size: 24px;
  font-weight: 700;
  background-color: transparent;

  &::placeholder {
    color: #D6DCEC;
  }
`;
const CardTextarea = styled.div`
	position: relative;
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 32px;
		width: calc(100% - 140px);
		height: 2px;
		background-color: #6A7080;
		z-index: 5;
	}
`;
const Textarea = styled.textarea`
  margin-top: 24px;
  padding-left: 32px;
  background-color: transparent;
  border: none;
  outline: none;
  color: #6A7080;
  resize: none;
  width: 100%;
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  scrollbar-width: none;
	border-left: 2px solid #336CFF;
	height: 140px;
`;

const HeadTitle = styled.h3`
	font-size: 24px;
	font-weight: 700;
`
const CardBlock = styled.div`
  margin-top: 40px;
`
const CardBtns = styled.div`
	display: flex;
	gap: 8px;
	margin-top: 30px;
  flex-grow: 1;
	align-items: flex-end;

	& button:first-child {
		width: 305px;
		justify-content: center;
	}
`
const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.2s;
`;
const ButtonCopy = styled(BaseButton)`
  border: 2px solid #333E59;
`;
const ButtonEdit = styled(BaseButton)`
	background-color: #336CFF;
	color: #D6DCEC;
`;

export default EditCard