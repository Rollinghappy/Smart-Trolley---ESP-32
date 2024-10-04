document.addEventListener('DOMContentLoaded', function () {
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const readOnlyInputs = document.querySelectorAll('.user-details input[readonly], .user-details textarea[readonly]');
    const avatarInput = document.getElementById('avatar-input');
    const avatar = document.getElementById('avatar');

    editProfileBtn.addEventListener('click', function () {
        readOnlyInputs.forEach(input => {
            input.removeAttribute('readonly');
        });
    });

    avatarInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            avatar.src = e.target.result;
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });
});
