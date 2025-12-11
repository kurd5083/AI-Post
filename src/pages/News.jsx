import styled from "styled-components";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsDatas } from "@/data/postsDatas";
import createSlug from '@/lib/createSlug';
import fire from "@/assets/tape/fire.svg";
import TimeIcons from "../icons/TimeIcons";
import TapeList from "@/components/TapeList";
import BtnBase from "@/shared/BtnBase";

const NewsDetail = () => {
	const { slug } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState(null);

	useEffect(() => {
		const foundPost = postsDatas.find(postItem => {
			const postSlug = createSlug(postItem.title);
			return postSlug === slug;
		});

		setPost(foundPost);
	}, [slug, navigate]);



	if (!post) {
		return (
			<div className="not-found">
				<h1>Новость не найдена</h1>
				<button onClick={() => navigate('/')}>
					Вернуться к домой
				</button>
			</div>
		);
	}

	return (
		<div>
			<NewsTitle>
				<img src={fire} alt="fire icon" />
				<mark>Лайв</mark> лента
			</NewsTitle>
			<NewsPost>
				<PostLeft>
					<PostHead>
						<img src={post.ava} alt="ava icon" />
						<p>{post.username}</p>
					</PostHead>
					<PostTilte>{post.title}</PostTilte>
					<PostDescription>{post.description}</PostDescription>
					<PostFooter className="news-meta">
						<BtnBase $bg="#336CFF" $color="#fff" $padding="21px 40px">Сохранить в канал</BtnBase>
						<PostTime><TimeIcons color="#336CFF"/>{post.time}</PostTime>
					</PostFooter>
				</PostLeft>
				<NewsImg
					src={post.img}
					alt={post.title}
				/>
			</NewsPost>
			<TapeList forceHorizontal={true} />
		</div>
	);
}
const NewsTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 48px;
  font-size: 48px;
  font-weight: 900;
	padding: 0 24px;
	margin-top: 40px;

  img {
    width: 25px;
    height: 32px;
		margin-right: 14px;
  }
  
  mark {
    position: relative;
    color: transparent;
    background: radial-gradient(circle, #FFBD5A, #EF6284, #5D2076, #5B1F74);
    background-size: 250px;
    background-position: -30px;
    background-clip: text;
  }
`

const NewsPost = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 48px 24px 0;
	padding: 32px;
	background-color: #1E2639;
	border-radius: 24px;
`
const PostLeft = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	max-width: 620px;
`

const PostHead = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  font-weight: 700;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
`

const PostTilte = styled.h2`
  font-size: 32px;
  line-height: 32px;
  font-weight: 700;
  padding-left: 8px;
`

const PostDescription = styled.p`
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  padding-left: 8px;
  color: #6A7080;
  white-space: pre-line;
`

const NewsImg = styled.img`
	max-width: 480px;
	width: 100%;
	max-height: 330px;
	border-radius: 24px;
	object-fit: cover;
`
const PostFooter = styled.div`
  display: flex;
	justify-content: space-between;
  align-items: center;
`
const PostTime = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
`
export default NewsDetail;