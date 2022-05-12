const readBooks = document.querySelector(".read-books");
const unreadBooks = document.querySelector(".unread-books");
const totalBooks = document.querySelector(".total-books");
const mainContent = document.querySelector(".main-content");
let numberOfBooks = 0;
let ReadBooksStats = 0;
let UnreadBooksStats = 0;
let TotalBooks = 0;
RBS_Element = document.querySelector(".read-books");
URBS_Element = document.querySelector(".unread-books");
TB_Element = document.querySelector(".total-books");
let myLibrary = [];

function updateStats() {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].read == "status: Done" && myLibrary[i].exist) {
            ReadBooksStats++;
            TotalBooks++;
        }
        if (myLibrary[i].read == "status: Not Done" && myLibrary[i].exist) {
            UnreadBooksStats++;
            TotalBooks++;
        }
    }

    RBS_Element.textContent = ReadBooksStats;
    URBS_Element.textContent = UnreadBooksStats;
    TB_Element.textContent = TotalBooks;
    ReadBooksStats = 0;
    UnreadBooksStats = 0;
    TotalBooks = 0;
}

function updateCards() {
    for (let i = 0; i < myLibrary.length; i++) {
        if (!myLibrary[i].exist) {
            continue;
        }
        let text = ".cardTitle" + i;
        let text2 = ".cardText" + i;
        let text3 = ".cardPages" + i;
        let text4 = ".cardRead" + i;

        let cardTitle = document.querySelector(text);
        let cardText = document.querySelector(text2);
        let cardPages = document.querySelector(text3);
        let cardRead = document.querySelector(text4);
        cardTitle.textContent = myLibrary[i].title;
        cardText.textContent = myLibrary[i].author;
        cardPages.textContent = myLibrary[i].pages;
        cardRead.textContent = myLibrary[i].read;

    }
}

function Book(title, author, pages, read, customeCounter, exist) {
    this.title = title;
    this.author = "by " + author;
    this.pages = "Pages: " + pages;
    if (read == true) {
        this.read = "status: Done";
    } else {
        this.read = "status: Not Done";
    }
    this.info = function () {
        console.log(this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read + ".");
    }
    this.customeCounter = customeCounter;
    this.exist = exist;
}

function showLibrary() {
    let bookName = document.getElementById("BookName").value;
    let authorName = document.getElementById("AuthorName").value;
    let pages = document.getElementById("Pages").value;
    let read = document.getElementById("ReadCheck").checked;

    if (bookName == "") {
        alert("Please Enter A Book Name");
        return false;
    }
    if (authorName == "") {
        alert("Please Enter An Author Name");
        return false;
    }
    if (pages == "") {
        alert("Please Enter Number Of Pages");
        return false;
    }

    myLibrary.push(new Book(bookName, authorName, pages, read, numberOfBooks, true));

    let card = document.createElement('div');

    let customeClass = "cc" + (numberOfBooks);
    card.classList.add('card', customeClass);
    card.style.width = "18rem";

    if (read) {
        card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title cardTitle${numberOfBooks}"></h5>
            <p class="card-text cardText${numberOfBooks}"></p>
            <hr class="card-text">
            <p class="card-text cardPages${numberOfBooks}"></p>
            <p class="card-text cardRead${numberOfBooks}"></p>
            <label class="switch">
            <input type="checkbox" onclick="checkFunc(this) "class="check${numberOfBooks}" checked>
            <span class="slider round"></span>
            </label>
            <input type="button" value="Delete" class="btn btn-danger btn${numberOfBooks}" onclick="removeCard(this)">
        </div>
        `;
    } else {
        card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title cardTitle${numberOfBooks}"></h5>
            <p class="card-text cardText${numberOfBooks}"></p>
            <hr class="card-text">
            <p class="card-text cardPages${numberOfBooks}"></p>
            <p class="card-text cardRead${numberOfBooks}"></p>
            <label class="switch">
            <input type="checkbox" onclick="checkFunc(this)" class="check${numberOfBooks}">
            <span class="slider round"></span>
            </label>
            <input type="button" value="Delete" class="btn btn-danger btn${numberOfBooks}" onclick="removeCard(this)">
        </div>
        `;
    }

    mainContent.appendChild(card);


    updateCards();
    updateStats();
    numberOfBooks++;
}

function removeCard(val) {
    let i;

    for (i = 0; i < numberOfBooks; i++) {
        if (val.classList.contains("btn" + i))
            break;
    }
    mainContent.childNodes.forEach(c => {
        if (c.className == "card cc" + i) {
            mainContent.removeChild(c);
            myLibrary[i].exist = false;
        }
    });
    updateStats();
    //mainContent.removeChild(mainContent.childNodes[i]);
}

function checkFunc(val) {
    let i;
    for (i = 0; i < numberOfBooks; i++) {
        if (val.classList.contains("check" + i))
            break;
    }

    myLibrary[i].read == "status: Done" ? myLibrary[i].read = "status: Not Done" : myLibrary[i].read = "status: Done";
    updateCards();
    updateStats();

}