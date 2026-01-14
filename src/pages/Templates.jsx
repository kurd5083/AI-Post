import { useEffect } from "react";
import styled from "styled-components";

import PageHead from "@/components/PageHead";
import PageFilter from "@/components/PageFilter";
import ViewCard from "@/components/Templates/ViewCard";
import EditCard from "@/components/Templates/EditCard";
import ModernLoading from "@/components/ModernLoading";

import BtnBase from "@/shared/BtnBase";

import { useCreatePostTemplate } from "@/lib/template/useCreatePostTemplate";
import { useGetPostTemplates } from "@/lib/template/useGetPostTemplates";
import { useGetPostTemplateCategories } from "@/lib/template/useGetPostTemplateCategories";
import { useUpdatePostTemplate } from "@/lib/template/useUpdatePostTemplate";

import { useTemplatesStore } from "@/store/templatesStore";

const categoryMap = {
  MARKETING: "Маркетинг",
  EDUCATION: "Образование",
  ENTERTAINMENT: "Развлечения",
  NEWS: "Новости",
  PROMO: "Промо",
};

const Templates = () => {
  const {
    templates,
    setTemplates,
    addTemplate,
    activeFilter,
    setActiveFilter,
    categories,
    setCategories,
  } = useTemplatesStore();

  const { templates: fetchedTemplates, templatesLoading } = useGetPostTemplates({
    category: activeFilter === "all" ? undefined : activeFilter.toUpperCase(),
  });
  const { categories: fetchedCategories } = useGetPostTemplateCategories();

  const { mutate: createTemplate, isPending: templatePending } = useCreatePostTemplate();
  const { mutate: updateTemplate } = useUpdatePostTemplate();

  useEffect(() => {
    if (!fetchedTemplates?.data) return;
    setTemplates(
      fetchedTemplates.data.map((t) => ({
        id: t.id,
        title: t.title,
        content: t.content,
        hashtags: t.hashtags ?? [],
        category: t.category,
        categoryLabel: categoryMap[t.category] ?? t.category,
        rating: t.rating ?? 0,
        isActive: t.isActive ?? true,
        isEditing: false,
      }))
    );
  }, [fetchedTemplates?.data]);

  useEffect(() => {
    if (!fetchedCategories) return;
    setCategories(fetchedCategories);
  }, [fetchedCategories]);

  const handleCreateTemplate = () => {
    const newTemplate = {
      id: `temp-${Date.now()}`,
      category: "PROMO",
      categoryLabel: categoryMap["PROMO"],
      title: "",
      content: "",
      hashtags: [],
      rating: 2,
      isActive: true,
      isEditing: true,
    };
    addTemplate(newTemplate);
  };

  const handleUpdateTemplate = (templateData) => {
    const dataToSend = { ...templateData };
    const templateId = dataToSend.id;

    delete dataToSend.isEditing;
    delete dataToSend.categoryLabel;
    delete dataToSend.id;
    dataToSend.hashtags = dataToSend.hashtags.map((h) => (h.startsWith("#") ? h : `#${h}`));

    updateTemplate({ id: templateId, data: dataToSend }, {
      onSuccess: (updatedTemplate) => {
        setTemplates(
          templates.map((t) =>
            t.id === updatedTemplate.id
              ? { ...updatedTemplate, categoryLabel: categoryMap[updatedTemplate.category] ?? updatedTemplate.category, isEditing: false }
              : t
          )
        );
      }
    });
  };

  const handleSaveTemplate = (templateData) => {
    if (templateData.id && !templateData.id.toString().startsWith("temp-")) {
      handleUpdateTemplate(templateData);
    } else {
      const dataToSend = { ...templateData };
      delete dataToSend.isEditing;
      delete dataToSend.categoryLabel;
      delete dataToSend.id;
      dataToSend.hashtags = dataToSend.hashtags.map((h) => (h.startsWith("#") ? h : `#${h}`));

      createTemplate(dataToSend, {
        onSuccess: (savedTemplate) => {
          setTemplates(
            templates.map((t) =>
              t.id === templateData.id
                ? { ...savedTemplate, categoryLabel: categoryMap[savedTemplate.category] ?? savedTemplate.category }
                : t
            )
          );
        }
      });
    }
  };

  const filteredTemplates = (templates ?? []).filter(
    (t) => activeFilter === "all" || (t.category?.toLowerCase() === activeFilter.toLowerCase())
  );

  return (
    <>
      <PageHead>
        <BtnBase
          $padding="16px 24px"
          $bg="#336CFF"
          $color="#FFFFFF"
          onClick={handleCreateTemplate}
          disabled={templatePending}
        >
          {templatePending ? "Создание..." : "+ Создать шаблон"}
        </BtnBase>
      </PageHead>

      <PageFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        placeholder="Поиск по шаблонам"
      />

      {templatesLoading ? (
        <ModernLoading text="Загрузка шаблонов..." />
      ) : filteredTemplates.length === 0 ? (
        <EmptyTemplates>Шаблоны отсутствует</EmptyTemplates>
      ) : (
        <TemplatesCards>
          {filteredTemplates.map((template) => (
            <TemplatesCard key={template.id}>
              {template.isEditing ? (
                <EditCard
                  template={template}
                  onSave={handleSaveTemplate}
                  categories={categories}
                />
              ) : (
                <ViewCard template={template} />
              )}
            </TemplatesCard>
          ))}
        </TemplatesCards>
      )}
    </>
  );
};

const TemplatesCards = styled.div`
  display: grid;
  gap: 16px;
  padding: 0 56px;
  grid-template-columns: repeat(3, 1fr);
  padding-bottom: 30px;

  @media (max-width: 1600px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 32px 30px;
  }
  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    padding: 0 24px 30px;
    grid-template-columns: 1fr;
  }
  @media (max-width: 560px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
`;

const TemplatesCard = styled.div`
  padding: 32px;
  background-color: #181F30;
  border-radius: 24px;

  @media(max-width: 480px) {
    padding: 24px;
  }
`;

const EmptyTemplates = styled.div`
  text-align: center;
  color: #6A7080;
  padding: 48px 0;
  font-weight: 600;
  background-color: #1C2438;
  border-radius: 16px;
  margin: 0 56px;

  @media (max-width: 1600px) {
    margin: 0 32px;
  }
  @media (max-width: 768px) {
    margin: 0 24px;
  }
`;

export default Templates;