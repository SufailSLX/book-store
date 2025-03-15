// let allBooks = <%- JSON.stringify(books) %>;
// let currentPage = 0;
// const booksPerPage = 5;

// function renderBooks() {
//     let bookList = document.getElementById("book-list");
//     bookList.innerHTML = "";
//     let start = currentPage * booksPerPage;
//     let end = start + booksPerPage;
//     let paginatedBooks = allBooks.slice(start, end);

//     paginatedBooks.forEach(book => {
//         let bookHtml = `
//             <div class="book-card">
//                 <img src="${book.image ? book.image : '/assets/default-book.png'}" alt="Book Cover">
//                 <div class="book-details">
//                     <strong class="book-title">${book.title}</strong>
//                     <p class="book-author">by ${book.author}</p>
//                     <p>${book.description}</p>
//                     <div class="book-buttons">
//                         <button class="add-to-cart">Click to read</button>
//                         <button class="add-to-wishlist" data-book-id="${book._id}">Add to Wishlist</button>
//                     </div>
//                 </div>
//             </div>
//         `;
//         bookList.innerHTML += bookHtml;
//     });
//     attachWishlistListeners();
//     document.getElementById("prev-btn").disabled = currentPage === 0;
//     document.getElementById("next-btn").disabled = end >= allBooks.length;
// }

// function nextBooks() {
//     if ((currentPage + 1) * booksPerPage < allBooks.length) {
//         currentPage++;
//         renderBooks();
//     }
// }

// function prevBooks() {
//     if (currentPage > 0) {
//         currentPage--;
//         renderBooks();
//     }
// }

// function attachWishlistListeners() {
//     document.querySelectorAll(".add-to-wishlist").forEach(button => {
//         button.addEventListener("click", async (event) => {
//             const bookId = event.target.getAttribute("data-book-id");
//             try {
//                 const response = await fetch("/api/wishlist/add", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ bookId })
//                 });
//                 const data = await response.json();
//                 if (data.success) {
//                     alert("Book added to wishlist!");
//                     updateWishlistIcon();
//                 } else {
//                     alert("Error: " + data.error);
//                 }
//             } catch (error) {
//                 console.error("Error adding book:", error);
//             }
//         });
//     });
// }

// async function updateWishlistIcon() {
//     try {
//         const response = await fetch("/api/wishlist");
//         const books = await response.json();
//         document.getElementById("wishlist-icon").innerHTML = `favorite (${books.length})`;
//     } catch (error) {
//         console.error("Error fetching wishlist:", error);
//     }
// }

// renderBooks();

// document.addEventListener("DOMContentLoaded", () => {
// const wishlistBtn = document.getElementById("wishlist-btn");
// if (wishlistBtn) {
// wishlistBtn.addEventListener("click", () => {
//     window.location.href = "/wishlist"; // Redirect to wishlist page
// });
// }
// });

// function searchBooks() {
// let input = document.getElementById("search-bar").value.toLowerCase();
// let books = document.querySelectorAll(".book-card");

// books.forEach(book => {
// let title = book.querySelector(".book-title").innerText.toLowerCase();
// let author = book.querySelector(".book-author").innerText.toLowerCase();

// if (title.includes(input) || author.includes(input)) {
//     book.style.display = "flex"; 
// } else {
//     book.style.display = "none";
// }
// });
// }

