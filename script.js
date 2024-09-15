document.addEventListener('DOMContentLoaded', function () {
    var resumeForm = document.getElementById('Resumeform');
    var resumeOutput = document.getElementById('resumeOutput');
    var editButton = document.createElement('button');
    var downloadButton = document.createElement('button');
    var shareButton = document.createElement('button');
    var resumeURLInput = document.getElementById('username');
    // Add Edit, Download and Share Buttons
    editButton.textContent = 'Edit Resume';
    downloadButton.textContent = 'Download as PDF';
    shareButton.textContent = 'Share Resume';
    downloadButton.style.display = 'none'; // Hide download button initially
    shareButton.style.display = 'none'; // Hide share button initially
    resumeOutput === null || resumeOutput === void 0 ? void 0 : resumeOutput.appendChild(editButton);
    resumeOutput === null || resumeOutput === void 0 ? void 0 : resumeOutput.appendChild(downloadButton);
    resumeOutput === null || resumeOutput === void 0 ? void 0 : resumeOutput.appendChild(shareButton);
    function generateResume(profilePictureURL, name, email, phone, education, skills, experience) {
        var resumeContent = "\n            <h2>Generated Resume</h2>\n            ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\" style=\"width: 150px; height: 150px; border-radius: 50%;\">") : '', "\n            <p><strong>Full Name:</strong> ").concat(name, "</p>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n            <h3>Education</h3>\n            <p>").concat(education, "</p>\n            <h3>Skills</h3>\n            <p>").concat(skills, "</p>\n            <h3>Experience</h3>\n            <p>").concat(experience, "</p>\n        ");
        if (resumeOutput) {
            resumeOutput.innerHTML = resumeContent;
            resumeOutput.appendChild(editButton);
            resumeOutput.appendChild(downloadButton);
            resumeOutput.appendChild(shareButton);
            downloadButton.style.display = 'inline-block'; // Show download button after resume generation
            shareButton.style.display = 'inline-block'; // Show share button after resume generation
        }
    }
    resumeForm.addEventListener('submit', function (event) {
        var _a;
        event.preventDefault();
        var profilePictureInput = document.getElementById('profilePicture');
        var nameElement = document.getElementById('name');
        var emailElement = document.getElementById('email');
        var phoneElement = document.getElementById('phone');
        var educationElement = document.getElementById('education');
        var skillsElement = document.getElementById('skills');
        var experienceElement = document.getElementById('experience');
        var name = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var education = educationElement.value;
        var skills = skillsElement.value;
        var experience = experienceElement.value;
        var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var profilePictureURL = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            generateResume(profilePictureURL, name, email, phone, education, skills, experience);
        };
        if (profilePictureFile) {
            reader.readAsDataURL(profilePictureFile);
        }
        else {
            generateResume(null, name, email, phone, education, skills, experience);
        }
    });
    editButton.addEventListener('click', function () {
        var nameElement = document.getElementById('name');
        var emailElement = document.getElementById('email');
        var phoneElement = document.getElementById('phone');
        var educationElement = document.getElementById('education');
        var skillsElement = document.getElementById('skills');
        var experienceElement = document.getElementById('experience');
        // Make form fields editable again
        nameElement.disabled = false;
        emailElement.disabled = false;
        phoneElement.disabled = false;
        educationElement.disabled = false;
        skillsElement.disabled = false;
        experienceElement.disabled = false;
        downloadButton.style.display = 'none'; // Hide download button during editing
        shareButton.style.display = 'none'; // Hide share button during editing
    });
    downloadButton.addEventListener('click', function () {
        var resumeContent = resumeOutput.innerHTML;
        var pdfWindow = window.open('', '', 'height=650,width=900');
        pdfWindow === null || pdfWindow === void 0 ? void 0 : pdfWindow.document.write('<html><head><title>Resume</title></head><body>');
        pdfWindow === null || pdfWindow === void 0 ? void 0 : pdfWindow.document.write(resumeContent);
        pdfWindow === null || pdfWindow === void 0 ? void 0 : pdfWindow.document.write('</body></html>');
        pdfWindow === null || pdfWindow === void 0 ? void 0 : pdfWindow.document.close();
        pdfWindow === null || pdfWindow === void 0 ? void 0 : pdfWindow.print(); // Note: The print dialog will be triggered
    });
    shareButton.addEventListener('click', function () {
        var resumeContent = resumeOutput.innerHTML;
        var blob = new Blob([resumeContent], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        resumeURLInput.value = url;
        alert('Resume URL has been copied to the input field. You can share this URL.');
    });
});
