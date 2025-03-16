// let allBooks = <%- JSON.stringify(books) %>; 
//         let currentPage = 0;
//         const booksPerPage = 5;
    
//         function renderBooks() {
//             let bookList = document.getElementById("book-list");
//             bookList.innerHTML = "";     
//             let start = currentPage * booksPerPage;
//             let end = start + booksPerPage;
//             let paginatedBooks = allBooks.slice(start, end);
    
//             paginatedBooks.forEach(book => {
//                 let bookHtml = `
//                     <div class="book-card">
//                         <img src="${book.image ? book.image : '/assets/default-book.png'}" alt="Book Cover">
//                         <div class="book-details">
//                             <strong>${book.title}</strong>
//                             <p>by ${book.author}</p>
//                             <p>${book.description}</p>
//                             <div class="book-buttons">
//                                 <button class="add-to-cart">Click to read</button>
//                                 <button class="add-to-wishlist">Add to Wishlist</button>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 bookList.innerHTML += bookHtml;
//             });
    
//             // Disable/Enable Buttons
//             document.getElementById("prev-btn").disabled = currentPage === 0;
//             document.getElementById("next-btn").disabled = end >= allBooks.length;
//         }
    
//         function nextBooks() {
//             if ((currentPage + 1) * booksPerPage < allBooks.length) {
//                 currentPage++;
//                 renderBooks();
//             }
//         }
    
//         function prevBooks() {
//             if (currentPage > 0) {
//                 currentPage--;
//                 renderBooks();
//             }
//         }
    
//         // ✅ Render the first set of books on page load
//         renderBooks();