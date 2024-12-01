// document.addEventListener("DOMContentLoaded", function() {
//     const registrationForm = document.querySelector("#registrationForm");
//     const profileContainer = document.querySelector("#profileContainer");

//     registrationForm.addEventListener("submit", function(event) {
//         event.preventDefault();
//         if (registrationForm.checkValidity()) {
//             registrationContainer.style.display = "none";
//             profileContainer.style.display = "block";
//         } else {
//             registrationForm.reportValidity();
//         }
//     });

//     const profileFinishButton = document.querySelector("#profileFinishButton");
//     profileFinishButton.addEventListener("click", function() {
//         profileContainer.style.display = "none";
//     });
// });
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./styles.css">
</head>
<body>
    <div class="Profile-container" id="profileContainer" >
        <div class="Profile-header">Profile Information</div>
        <div class="form">
            <form id="profileForm">
                <div class="photo-upload">
                    <label for="photo">Select a photo:</label>
                    <input type="file" id="photo" name="photo" accept="image/*">
                    <img id="photo-preview" src="" alt="Preview" style="width: 100px; height: 100px; margin-top: 10px; margin-left: 280px;">
                  </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="qualification">Qualification:</label>
                        <input type="text" id="qualification" name="qualification" placeholder="Qualification" required>
                    </div>
                    <div class="form-group">
                        <label for="university">University:</label>
                        <input type="text" id="university" name="university" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="employment">Private/Govt.</label>
                        <input type="text" id="employment" name="employment" required>
                    </div>
                    <div class="form-group">
                        <label for="job">Job</label>
                        <input type="text" id="job" name="job" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="income">Monthly Income:</label>
                        <input type="number" id="income" name="income" required>
                    </div>
                    <div class="form-group">
                        <label for="maritalStatus">Marital Status:</label>
                        <input type="text" id="maritalStatus" name="maritalStatus" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="height">Height:</label>
                        <input type="text" id="height" name="height" required>
                    </div>
                    <div class="form-group">
                        <label for="caste">Caste:</label>
                        <input type="text" id="caste" name="caste" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="disability">Disability:</label>
                        <input type="text" id="disability" name="disability" required>
                    </div>
                    <div class="form-group">
                        <label for="ownHouse">Own House:</label>
                        <input type="text" id="ownHouse" name="ownHouse" required>
                    </div>
                </div>
                <button id="profileFinishButton" type="button">Finish</button>
            </form>
        </div>
    </div>
</body>
<script>
    const photoInput = document.getElementById('photo');
const photoPreview = document.getElementById('photo-preview');

photoInput.addEventListener('change', function() {
  const file = photoInput.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    photoPreview.src = event.target.result;
  };

  reader.readAsDataURL(file);
});
</script>
</html>