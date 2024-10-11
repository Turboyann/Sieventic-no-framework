document.addEventListener('DOMContentLoaded', function() {
    const comments = [];
    const commentInput = document.getElementById('commentInput');
    const nameInput = document.getElementById('nameInput');
    const publishButton = document.getElementById('publishButton');
    const commentsContainer = document.getElementById('comments');
    const commentCount = document.getElementById('commentCount');

    function updateCommentCount() {
        commentCount.textContent = comments.length;
    }

    function renderComments() {
        commentsContainer.innerHTML = '';
        comments.forEach((comment, index) => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <div class="comment-content">
                    <h2>${comment.name}</h2>
                    <p>${comment.message}</p>
                    <span class="comment-date">${comment.date}</span>
                </div>
                <div class="comment-actions">
                    <span>${comment.likes}</span>
                    <button class="like-button ${comment.userAction === 'like' ? 'active' : ''}" onclick="handleLike(${index})">👍</button>
                    <button class="dislike-button ${comment.userAction === 'dislike' ? 'active' : ''}" onclick="handleDislike(${index})">👎</button>
                </div>
            `;
            commentsContainer.appendChild(commentElement);
        });
    }

    function addComment() {
        if (!commentInput.value) return;

        const newComment = {
            name: nameInput.value || 'Anonymous',
            message: commentInput.value,
            date: new Date().toLocaleString(),
            likes: 0,
            userAction: null
        };

        comments.push(newComment);
        commentInput.value = '';
        publishButton.disabled = true;
        updateCommentCount();
        renderComments();
    }

    window.handleLike = function(index) {
        const comment = comments[index];
        if (comment.userAction === 'like') {
            // User is unliking
            comment.likes -= 1;
            comment.userAction = null;
        } else {
            // User is liking
            if (comment.userAction === 'dislike') {
                // If previously disliked, remove the dislike first
                comment.likes += 1;
            }
            comment.likes += 1;
            comment.userAction = 'like';
        }
        renderComments();
    };

    window.handleDislike = function(index) {
        const comment = comments[index];
        if (comment.userAction === 'dislike') {
            // User is un-disliking
            comment.likes += 1;
            comment.userAction = null;
        } else {
            // User is disliking
            if (comment.userAction === 'like') {
                // If previously liked, remove the like first
                comment.likes -= 1;
            }
            comment.likes -= 1;
            comment.userAction = 'dislike';
        }
        renderComments();
    };

    commentInput.addEventListener('input', function() {
        publishButton.disabled = !this.value;
    });

    publishButton.addEventListener('click', addComment);

    updateCommentCount();
});
