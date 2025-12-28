import { useState } from "react";
import styled from "styled-components";
import PageHead from '@/components/PageHead'
import PageFilter from "@/components/PageFilter";
import ViewCard from "@/components/Templates/ViewCard";
import EditCard from "@/components/Templates/EditCard";
import BtnBase from "@/shared/BtnBase";
import { templatesDatas } from "@/data/templatesDatas";
import { useCreatePostTemplate } from "@/lib/template/useCreatePostTemplate";

const Templates = () => {
	const [activeFilter, setActiveFilter] = useState("all");
	const [templates, setTemplates] = useState(templatesDatas);
	const { mutate: createTemplate, isLoading: templateLoading } = useCreatePostTemplate();
	const handleCreateTemplate = async () => {
		const newTemplate = {
			category: "MARKETING",
			title: "",
			content: "",
			hashtags: ['1', '2'],
			rating: 2,
			isActive: true,
		};

		setTemplates(prev => [newTemplate, ...prev]);

	};
	const handleSaveTemplate = (templateData) => {
		createTemplate(templateData); 
		// const savedTemplate = createTemplate(templateData);
		// setTemplates(prev =>
		// 	prev.map(t => t === templateData ? { ...savedTemplate }: t)
		// );
	
	};

	return (
		<>
			<PageHead>
				<BtnBase
					$padding="16px 24px"
					$bg="#336CFF"
					$color="#FFFFFF"
					onClick={handleCreateTemplate}
					disabled={templateLoading}
				>
					{templateLoading ? "Создание..." : "+ Создать шаблон"}
				</BtnBase>
			</PageHead>
			<PageFilter
				activeFilter={activeFilter}
        		setActiveFilter={setActiveFilter}
				placeholder="Поиск по шаблонам"
			/>
			<TemplatesCards>
			{templates?.map((template) => (
				<TemplatesCard key={template.id}>
					{template.isEditing ? (
						<EditCard
								template={template}
								onSave={handleSaveTemplate}
							/>
					) : (
						<ViewCard template={template}/>
					)}
				 </TemplatesCard>
			))}
			</TemplatesCards>
		</>
	)
}

const TemplatesCards = styled.div`
	display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 16px;
  padding: 0 56px;
	padding-bottom: 30px;
	
	@media(max-width: 1600px) {
    padding: 0 32px 30px;
  }
  @media(max-width: 768px) {
    padding: 0 24px 30px;
  }

	@media(max-width: 560px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
`
const TemplatesCard = styled.div`
	padding: 32px;
	background-color: #181F30;
	border-radius: 24px;
	
	@media(max-width: 480px) {
    padding: 24px;
  }
`
export default Templates