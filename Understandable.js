function fetchTasks() {
    $.ajax({
        url: '/posts',
        method: 'GET',
        success: function (data) {
            const taskList = $('#task-list');
            taskList.empty();
            data.forEach(function (post) {
                taskList.append(`
                    <li class="list-group-item">
                        ${post.title}
                        <span class="float-right">
                            <button class="btn btn-danger btn-sm delete-task" data-id="${post.id}">Delete</button>
                        </span>
                    </li>
                `);
            });
        },
    });
}
$(document).ready(function () {
    // Fetch and display posts from the API
    function fetchPosts() {
        $.ajax({
            url: '/posts',
            method: 'GET',
            success: function (data) {
                const postList = $('#post-list');
                postList.empty();
                data.forEach(function (post) {
                    postList.append(`
                        <li class="list-group-item">
                            ${post.title} by ${post.author}
                            <span class="float-right">
                                <button class="btn btn-danger btn-sm delete-post" data-id="${post.id}">Delete</button>
                            </span>
                        </li>
                    `);
                });
            },
        });
    }

    fetchPosts();

    // Add a new post
    $('#post-form').on('submit', function (e) {
        e.preventDefault();
        const title = $('#post-title').val();
        const author = $('#post-author').val();
        $.ajax({
            url: '/posts',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ title, author }),
            success: function () {
                fetchPosts();
                $('#post-title').val('');
                $('#post-author').val('');
            },
        });
    });

    // Delete a post
    $('#post-list').on('click', '.delete-post', function () {
        const postId = $(this).data('id');
        $.ajax({
            url: `/posts/${postId}`,
            method: 'DELETE',
            success: function () {
                fetchPosts();
            },
        });
    });
});
