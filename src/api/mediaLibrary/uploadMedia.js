import apiClient from "@/api/apiClient";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

export const uploadMediaLibrary = async (files) => {
  const base64Files = await Promise.all(files.map(file => fileToBase64(file)));
    console.log(base64Files)

    const response = await apiClient.post("/media-library/upload", {params: ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASDSURBVHgBlVXbTxxVHP7OzCwLuyws13JrWUQuDdQiSmsvCVTbtMRUNCY1pkZ38cGHJrYP+qAvLH+AEZPG+CLLi/qiCRhNH0CBeCGNFigabZW6q1wWCpTtsrDXmfF3BpbObHerPckkM+fyfd/5znd+w/CA5vSM2gUoF1WoHQBzMKiOnaGACkwLwKAMcWjAdcKXCYNlACYw2UODHfh/bUCB2JuOSEjteN0zclGAPPUQ4Jomvqb74+FLDyTo9nzTQ1vvo1d7JiRrlgkNZXYU52Yb+lWV1gjsfY6RloArp2lu4yLVALIRiaO5shATt5YgKyoO7i1GdaENjXvsSChKcpVbvxONgHtOUAbwHJOkgdQU5yGWkPHeueN49UgD7kZi6HeexKGaMu0AXz5cj5nFNZhEnRkC6+GYuwRMjbv1tnDh61sRiIIAsySg5+whhEj99PwaLpx4TCP+dXEVT9WW4/K3M4jFFeRlm/T67DwkGjZnogPypvrWUl2Cjvoq+O4EUWjJRiP57l3dwOfXZlFgMePtM61YCGziw9FfUGXPxVWvXxOkb5SsArH1uVecYOyMwXt6zh9phP/uJkrzLGhz7IFEFlQV5OKZ/XsRjESRS4ctCgwlthxYskT85r8DWVYhCPeSzxQlKqgC69KDMxp/qa0OX1/34enGKjRXFGmW6T3ubHagLN+KcCyBfEsWorIChR5JNO6AsNs5X4u+8xQpXN+K4q3Tj+ODkRkNhKW5jnx3WZKIubUQDlQWwXm8iebGDXNomUNASuaHf5/DT95lRCk5TzpKMtx1oDzfQnH1o2VfCc1fQoXdCovZlDrNcd9N5gnp6TqMd76YwLG6CkpHVloCRtvqaKjC5N+3ESEx7qGrSJBN+TnG+UTAfIYOWvjdHwtwHduPa75lbJFFkXjCsCh5AZeDWwhFY9iMyjj6aDkcxflYJOu4yJ0WEKhS+lLVDU7+BSttd3puFQvrIfJawvpmBKpO/c9ErhCRdzWIN9qbcPZgDV584hGKduWuq7ziSkxRx0l2h57AYpZw4ZNRvPtsG/YV2XDrdkBLy9pGhJLC8NWMD/VUHkZvzKO1uhRvfjaOVRqz7pxBMqqEPSQpgtRHF81QoLgtp5uq8cOsX8v+SiiMOgKc+mdFAw+Go1q6xm4uYJL6HCQiHJNTjYAiJAY1KpdnZFRfnnksa4vtsOWYMEYqc6kMWOhiXT7fji+ve/HpxE3IZA9XbBLvy0myDfS7Trqkba/iLgbTFHYiy89wdiUAhQ6LW2GjZPCEnPvoCmyUqs4D1fiRKqqSUm1xz3v648V7Nbs0KlenT4Haq5/EdnbC01FkzcaNpXWKoFlLWYjsyQS+vVbt5ZhJnN3W7Rl2U5d2HvyHcrS2DMsbYXz/px9xWdZsCobjKLWZKftKBni1t991yq0XamhOz/AlYZvEzgdjBFxD+Z6nuHLN3DZRYGltYdvgfcbdpGlOzxUHU0U3Y8Jr/Dubfj6ply0FfIyfY9KW/yTQE1Ed7aJJz9NnC0uGQLv9qo8UjysI9Q24XghkwvgXQIjVJoPrCmcAAAAASUVORK5CYII=']});
//   const response = await apiClient.post("/media-library/upload", {
//     files: base64Files
//   });

  return response.data;
};
