import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
   * {
       margin: 0;
       padding: 0;
       outline: 0;
       box-sizing: border-box;
   }
    html, body, #root {
       min-height: 100%;
   }
    body {
       @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
       font-family: 'Lato', sans-serif;
       background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% );
       -webkit-font-smoothing: antialiased !important;
   }
    body, input, button {
       color: #222;
       font-size: 14px;
   }
    button {
       cursor: pointer;
   }

   div.react-confirm-alert-overlay {
        background-image: radial-gradient( circle farthest-corner at 10% 20%, rgba(128,248,174,0.2) 0%, rgba(223,244,148,0.8) 90% );
    }

`;
