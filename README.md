# Live Preview SSR Example
This is an example of [Live Preview SSR](https://www.contentstack.com/docs/developers/set-up-live-preview/set-up-live-preview-for-your-website/#server-side-rendering-ssr) implementation.

## Prerequisite
1. Contentstack account
2. Stack Api Key 
3. Publish Environment
4. Contentstack Delivery Token
5. Contentstack Management Token
> Please check [this](https://www.contentstack.com/docs/developers/set-up-live-preview/set-up-live-preview-for-your-website/#server-side-rendering-ssr) for more info on this.

## Usage
1. Step 1: Create a content type with `single line textbox` field and then create a entry with this content type
2. Step 2: Rename `.env.sample` file to `.env` file and add you credentials
3. Step 3: Install all the dependencies
    ```bash
    npm install
    ```
4. Step 4: Start the example application
    ```bash
    npm start
    ```
> Note: The example will start on `localhost:3001`

## Important Files
1. `contentstack.config.js`
    This file contain configuration related to `Contentstak SDK` and `Contentstack live preview SDK`
2. `app.js`
    This file contain a middleware for live preview 
    ```js
    app.use((req,res,next) => {
      Stack.livePreviewQuery(req.query);
      next();
    })
    ```
3. `routes/index.js`
    This file contain code for fetching data from contentstack sdk and passing it to the ejs file. This file also contain a code related to live preview edit button functionalities.
4. `views/index.ejs`
    This file contain code the initialization of live preview for the route.
    ```js
    <script src="https://unpkg.com/@contentstack/live-preview-utils@1.3.2/dist/index.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/@contentstack/live-preview-utils/dist/main.css" />
    ```
    
    ```js
    ContentstackLivePreview.init({
        cleanCslpOnProduction: true,
        enable: true,
        stackDetails: {
        apiKey: '<%= process.env.CONTENTSTACK_API_KEY %>',
        environment: '<%= process.env.CONTENTSTACK_ENVIRONMENT %>'
        },
        clientUrlParams: {
            host: "app.contentstack.com",
        },
        editButton: {
            enable: true,
            exclude: ["outsideLivePreviewPortal"],
            includeByQueryParameter: false,
            position: 'top-center',
        }
    });
    ```