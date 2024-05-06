// Dynamic data array with additional information 
 const dynamicData = [ 
    { 
        title: "Latest News", 
        content: "Check out our latest updates!", 
        category: "News", 
        date: "2024-05-06", 
        author: "John Doe", 
        rating: 4.5 
    }, 
    { 
        title: "Product Launch", 
        content: "Introducing our new product line.", 
        category: "Product", 
        date: "2024-04-30", 
        author: "Jane Smith", 
        rating: 4.8 
    }, 
    { 
        title: "Special Offer", 
        content: "Don't miss out on our limited-time offer!", 
        category: "Promotion", 
        date: "2024-05-02", 
        author: "Alex Johnson", 
        rating: 4.2 
    } 
]; 

// Function to inject content into HTML 
function injectContent() { 
    const contentElement = document.getElementById('content'); 
    
    // Loop through dynamicData and create HTML elements 
    for (let i = 0; i < dynamicData.length; i++) { 
        const post = dynamicData[i]; 
        const postDiv = document.createElement('div'); 
        const postTitle = document.createElement('h2'); 
        const postContent = document.createElement('p'); 
        const postCategory = document.createElement('p'); 
        const postDate = document.createElement('p'); 
        const postAuthor = document.createElement('p'); 
        const postRating = document.createElement('p'); 
        
        postTitle.textContent = post.title; 
        postContent.textContent = post.content; 
        postCategory.textContent = "Category: " + post.category; 
        postDate.textContent = "Date: " + post.date; 
        postAuthor.textContent = "Author: " + post.author;
        postRating.textContent = "Rating: " + post.rating; 
        
        postDiv.appendChild(postTitle); 
        postDiv.appendChild(postContent); 
        postDiv.appendChild(postCategory); 
        postDiv.appendChild(postDate); 
        postDiv.appendChild(postAuthor); 
        postDiv.appendChild(postRating); 
        contentElement.appendChild(postDiv); 
    } 
} 

// Event handling 
document.addEventListener('DOMContentLoaded', injectContent);
