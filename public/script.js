$(document).ready(function () {
    $("#userSlider").on("input change", function () {
        var userCount = $(this).val();
        $("#userCount").text(userCount);
        var planNumber;
        if (userCount > 30) {
            planNumber = 3;
        } else {
            planNumber = Math.floor(userCount / 10) + 1;
        }
        $(".card").removeClass("border-primary");
        $(".card:nth-child(" + planNumber + ")").addClass("border-primary");
    });
});

const form = document.getElementById("myForm")

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;


    const formData = {
        firstname: name,
        email: email,
        message: message
    };
    console.log(formData)

    fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.Success === "Data Added") {
                form.innerHTML = "<h2>Thank you for signing up</h2>";
                form.style.display = 'flex';
                form.style.fontFamily = 'sans-serif';
                form.style.justifyContent = 'center';
                form.style.alignContent = 'center';
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
});
