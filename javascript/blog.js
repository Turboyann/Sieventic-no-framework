document.addEventListener("DOMContentLoaded", function () {
    // Blog post data (normally this would come from a database or an API)
    const blogPosts = [
        {
            id: "pre-rendering",
            title: "First Blog Post",
            date: "10.10.2024",
            category: "Bildung",
            author: "Yann",
            excerpt: "Dies ist ein Beispieltext für den ersten Beitrag. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eaque veritatis ipsa corporis rerum dolore, vitae praesentium ducimus fugit quis?",
            url: "posts/post1.html"
        },
        {
            id: "ssg-ssr",
            title: "Second Blog Post",
            date: "10.10.2024",
            category: "Bildung",
            author: "Yann",
            excerpt: "Dies ist ein Beispiel eines Textes des Beitrages",
            url: "posts/post2.html"
        },
    ];

    // Get the blog posts container
    const blogPostsContainer = document.getElementById("blog-posts");

    let currentCategory = ''; // Keep track of the current category
    let currentQuery = ''; // Keep track of the current search query

    // Function to render blog posts
    function renderPosts(posts) {
        blogPostsContainer.innerHTML = ""; // Clear existing posts

        if (posts.length === 0) {
            // Display message if no posts are found
            blogPostsContainer.innerHTML = `<p class="no-results">Keine Suchergebnisse</p>`;
            return; // Exit the function
        }

        // If posts are available, display them
        posts.forEach(post => {
            const postElement = document.createElement("li");
            postElement.className = "post";
            postElement.innerHTML = `
                <img class="post-image-big border" src="images/${post.id}.jpg" alt="image" />
                <p class="category">${post.category}</p>
                <a href="${post.url}">
                    <h1 class="post-title">${post.title}</h1>
                </a>
                <p class="data-post">${post.date},<span class="post-author"> ${post.author}</span></p>
                <p class="post-text">${post.excerpt}</p>
                <a href="${post.url}">
                    <button class="button-big">MEHR LESEN</button>
                </a>
            `;
            blogPostsContainer.appendChild(postElement);
        });
    }

    function applyFilters() {
        let filteredPosts = blogPosts;

        // First, filter by category
        if (currentCategory !== '') {
            filteredPosts = filteredPosts.filter(post => post.category.toLowerCase() === currentCategory.toLowerCase());
        }

        // Then, filter by search query
        if (currentQuery !== '') {
            filteredPosts = filteredPosts.filter(post => 
                post.title.toLowerCase().includes(currentQuery) ||
                post.excerpt.toLowerCase().includes(currentQuery) ||
                post.category.toLowerCase().includes(currentQuery)
            );
        }

        renderPosts(filteredPosts);
    }

    // Function to handle category click
    function handleCategoryClick(category, clickedButton) {
        currentCategory = category;
        applyFilters();

        // Remove 'active' class from all buttons
        document.querySelectorAll('.category-button').forEach(button => {
            button.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        if (clickedButton) {
            clickedButton.classList.add('active');
        }

        // Update URL
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('category', category);
        window.history.pushState({}, '', newUrl);
    }

    // Function to handle search input
    window.handleSearch = function(event) {
        currentQuery = event.target.value.toLowerCase();
        applyFilters();
    }

    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Check for category parameter in URL
    const urlCategory = getUrlParameter('category');
    if (urlCategory) {
        currentCategory = urlCategory;
        // Find the button that corresponds to this category and activate it
        const categoryButton = document.querySelector(`.category-button[data-category="${urlCategory}"]`);
        if (categoryButton) {
            handleCategoryClick(urlCategory, categoryButton);
        }
    }

    // Add event listeners to category buttons
    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', function () {
            const category = this.dataset.category; // Get the category from data attribute
            handleCategoryClick(category, this); // Pass the category and the clicked button
        });
    });

    // Initial render of all posts
    applyFilters();
});
