import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
        font-family: "Helvetica", "Arial", sans-serif;
        line-height: 1.5;
        font-size:30px;
    }
`;

export default GlobalStyle;
