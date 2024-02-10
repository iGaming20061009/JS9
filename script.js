"use strict";
let currentPage = 1;
let totalPages;

function getUsers(page) {
    fetch("https://reqres.in/api/users?page=" + page, {
        method: "GET",
    })
        .then(function (responsedata) {
            // console.log(responsedata);
            if (!responsedata.ok) {
                throw responsedata.status;
            }
            return responsedata.json();
        })
        .then(function (responseInfoJs) {
            // console.log(responseInfoJs);
            const fragment = document.createDocumentFragment();

            responseInfoJs.data.forEach(function (item) {
                let li = document.createElement("li");

                let pUserInfo = document.createElement("p");
                pUserInfo.textContent = `${item.first_name} ${item.last_name}`;

                let imgElement = document.createElement("img");
                imgElement.src = item.avatar;

                li.appendChild(pUserInfo);
                li.appendChild(imgElement);
                fragment.appendChild(li);
            });

            document.getElementById("list-users").innerHTML = " ";
            document.getElementById("list-users").appendChild(fragment);

            totalPages = responseInfoJs.total_pages;
            // console.log(totalPages);
        })
        .catch(function (error) {
            if (error === 404) {
                let pError = document.createElement("p");
                pError.textContent = "Server Error";
                document.getElementById("server-api").appendChild(pError);
            } else {
                console.log("Error Text");
            }
        });
}

let loadmore = document.getElementById("loadmore");
let loadprev = document.getElementById("loadprev");
document.getElementById("loadprev").addEventListener("click", function () {
    if (currentPage === 1) {
        loadprev.setAttribute("disabled", "");
        return;
    }
    loadmore.removeAttribute("disabled");
    currentPage -= 1;
    getUsers(currentPage);
    console.log(currentPage);
});

document.getElementById("loadmore").addEventListener("click", function () {
    if (currentPage === totalPages) {
        loadmore.setAttribute("disabled", "");
        return;
    }
    loadprev.removeAttribute("disabled");
    currentPage += 1;
    getUsers(currentPage);
    console.log(currentPage);
});

// if (currentPage == totalPages){
//     document.getElementById("loadmore").disabled = true;
// }
getUsers(currentPage);
