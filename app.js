const api_key = "fc9bcfb6aac242a085a78804789b1d87";
    const recipelist = document.querySelector("#recipe-list");

    function displayrecipes(recipes = []) {
      recipelist.innerHTML = "";
      if (!Array.isArray(recipes)) {
        recipelist.innerHTML = "❌ Invalid recipe data from API.";
        console.error("recipes is not an array:", recipes);
        return;
      }

      recipes.forEach((recipe) => {
        const li = document.createElement("li");
        li.classList.add("recipe-item");

        const title = document.createElement("h2");
        title.textContent = recipe.title;

        const img = document.createElement("img");
        img.src = recipe.image;
        img.alt = recipe.title;


        const recingre = document.createElement("p")
        recingre.innerHTML = `
        <strong>Ingredients :- </strong>${recipe.extendedIngredients.map((ingredient)=>ingredient.original).join(", ")}
        `
        const linktoview = document.createElement("a");
        linktoview.href = recipe.sourceUrl;
        linktoview.innerText = "View Full Recipe"
        linktoview.target = "_blank"
        linktoview.classList.add("viewbtn")

        li.appendChild(img);
        li.appendChild(title);
        li.appendChild(recingre)
        li.appendChild(linktoview)
        recipelist.appendChild(li);
      });
    }

    async function getrecipes() {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?number=5&apiKey=${api_key}`
        );
        const data = await response.json();
        console.log("API response:", data);

        // Return array only if valid
        if (Array.isArray(data.recipes)) {
          return data.recipes;
        } else {
          console.warn("⚠️ No recipes found in API response.");
          return [];
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
      }
    }

    async function init() {
      const recipes = await getrecipes();
      console.log("Recipes value is:", recipes);
      displayrecipes(recipes);
    }

    init();