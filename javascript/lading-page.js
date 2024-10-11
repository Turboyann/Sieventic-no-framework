document.addEventListener('DOMContentLoaded', function() {
    const blogPosts = [
        {
            id: "pre-rendering",
            title: "First Blog Post",
            date: "10.10.2024",
            category: "Bildung",
            author: "Yann",
            excerpt: "This is the excerpt of the first blog post.",
            url: "posts/post1.html"
        },
        {
            id: "ssg-ssr",
            title: "Second Blog Post",
            date: "10.10.2024",
            category: "Bildung",
            author: "Yann",
            excerpt: "This is the excerpt of the second blog post.",
            url: "posts/post2.html"
        },
    ];

    function getFormattedDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('de-DE', options);
    }

    // Render oldest posts
    const oldestPostsContainer = document.querySelector('.hero-post-left .max-w-2xl');
    blogPosts.slice(0, 2).reverse().forEach(post => {
        const { id, title, date, category, author } = post;
        const formattedDate = getFormattedDate(date);
        
        const postElement = document.createElement('li');
        postElement.className = 'hero-posts-left';
        postElement.innerHTML = `
            <img class="post-image-big" src="/images/${id}.jpg" alt="image">
            <p class="category">${category}</p>
            <h1 class="post-title">${title}</h1>
            <p class="data-post">${formattedDate} <span class="post-author">${author}</span></p>
            <p class="post-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui facere architecto inventore facilis ducimus porro labore praesentium tempora ipsam blanditiis.</p>
            <a href="/blog/posts/${id}">
                <button class="button-big">MEHR LESEN</button>
            </a>
        `;
        oldestPostsContainer.appendChild(postElement);
    });

    // Render newest posts
    const newestPostsContainer = document.querySelector('.newest-posts');
    blogPosts.slice(0, 2).forEach(post => {
        const { id, title, date, category } = post;
        const formattedDate = getFormattedDate(date);
        
        const postElement = document.createElement('li');
        postElement.className = 'w-full relative pb-10';
        postElement.innerHTML = `
            <img class="hero-right-image" src="/images/${id}.jpg" alt="image">
            <h1 class="hero-right-small-title">${title}</h1>
            <p class="post-text-right mb-2.5">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <a href="/blog/posts/${id}" class="p-1">
                <button class="button-small">MEHR LESEN</button>
            </a>
        `;
        newestPostsContainer.appendChild(postElement);
    });
});
