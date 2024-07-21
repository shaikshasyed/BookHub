<a href="https://shabookhub.ccbp.tech" target="_blank">Click To View Website</a>
<details>

<summary>Functionalities</summary>
<br/>
- **Login Route**

  - When the invalid username and password are provided and the **Login** button is clicked, then the respective error message received from the response should be displayed
  - When the valid username and password are provided and the **Login** button is clicked, then the page should be navigated to the Home Route
  - When an _unauthenticated_ user tries to access the Home, Bookshelves and Book Details Route, then the page should be navigated to the Login Route
  - When an _authenticated_ user tries to access the Home, Bookshelves and Book Details Route, then the page should be navigated to the respective route
  - When an _authenticated_ user tries to access the Login Route, then the page should be navigated to the Home Route

- **Home Route**

  - When an _authenticated_ user opens the Home Route,

    - An HTTP GET request should be made to **Top Rated Books API URL** with `jwt_token` in the Cookies

      - **_Loader_** should be displayed while fetching the data
      - After the data is fetched successfully, display the list of top rated books received from the response
      - If the HTTP GET request made is unsuccessful, then the failure view given in the **Figma** screens should be displayed

        - When the **Try Again** button is clicked, an HTTP GET request should be made to **Top Rated Books API URL**

      - When the **Find Books** button is clicked, then the page should be navigated to the Bookshelves Route
      - When a **book item** is clicked, then the page should be navigated to the Book Details Route

    - **Header**  
    
      - When the **Book Hub logo** in the header is clicked, then the page should be navigated to the Home Route
      - When the **Home** link in the header is clicked, then the page should be navigated to the Home Route
      - When the **Bookshelves** link in the header is clicked, then the page should be navigated to the Bookshelves Route
      - When the **Logout** button in the header is clicked, then the page should be navigated to the Login Route

- **Bookshelves Route**

  - When an _authenticated_ user opens the Bookshelves Route

    - An HTTP GET request should be made to **Books API URL** with `jwt_token` in the Cookies and query parameters `shelf` and `search` with initial values as `ALL` and empty string respectively

      - The page should initially consist of **All Books** heading
      - **_Loader_** should be displayed while fetching the data
      - After the data is fetched successfully, display the list of books received from the response
      - If the HTTP GET request made is unsuccessful, then the failure view given in the **Figma** screens should be displayed

        - When the **Try Again** button is clicked, an HTTP GET request should be made to **Books API URL**

      - When a button in the **bookshelves** is clicked (Use the bookshelvesList data provided in the App.js to render Bookshelves),

        - The **All Books** heading changed to **{bookshelf name} Books**. Here the bookshelf name refers to the clicked bookshelf label from the provided `bookshelvesList`
        - Make an HTTP GET request to the **Books API URL**  with `jwt_token` in the Cookies and query parameter `shelf` with value as the value of the clicked bookshelf from the provided `bookshelvesList`
        - **_Loader_** should be displayed while fetching the data
        - After the data is fetched successfully, display the list of books received from the response

      - When a non-empty value is provided in the search input and the search icon button is clicked

        - Make an HTTP GET request to the **Books API URL** with `jwt_token` in the Cookies and query parameter `search` with value as the text provided in the search input
        - **_Loader_** should be displayed while fetching the data
        - After the data is fetched successfully, display the list of books received from the response

      - When the HTTP GET request made to the **Books API URL** returns an empty list for books, then the **No Books View** should be displayed as shown in the Figma

  - When multiple filters are applied, then the HTTP GET request should be made with all the filters that are applied

    - For example: When the **Read** bookshelf is clicked and search input value is **Speak**, then the **Books API URL** will be as follows

      ```js
      const apiUrl = 'https://apis.ccbp.in/book-hub/books?shelf=READ&search=Speak'
      ```

  - When a **book** item is clicked, then the page should be navigated to the Book Details Route
  - All the header functionalities mentioned in the Home Route should work in this route accordingly

- **Book Details Route**

  - When an _authenticated_ user opens the Book Details Route

    - An HTTP GET request should be made to **Book Details API URL** with `jwt_token` in the Cookies and book `id` as path parameter
      - **_Loader_** should be displayed while fetching the data
      - After the data is fetched successfully, book details received from the response should be displayed
    - If the HTTP GET request made is unsuccessful, then the failure view given in the **Figma** screens should be displayed
      - When the **Try Again** button is clicked, an HTTP GET request should be made to **Book Details API URL**

  - All the header functionalities mentioned in the Home Route should work in this route accordingly

- **Not Found Route**

  - When a random path is provided as the URL path, then the page should be navigated to the Not Found Route

- Users should be able to view the website responsively in mobile view, tablet view as well
</details>


**You can use any one of the following credentials**

```text
  username: aakash
  password: sky@007
```

```text
  username: agastya
  password: myth#789
```

```text
  username: advika
  password: world@5
```

```text
  username: binita
  password: modest*6
```




<br/>
</details>
