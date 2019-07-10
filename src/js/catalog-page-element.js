// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';
import productsJson from '../data/products.json';

const isAvailable = (sizes) => {
    if (sizes.available === true) {
        return true;
    }
};

const saleBanner = html`
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" ><defs><path d="M343.7 214.16L158.99 278.32L158.99 406.63L343.7 470.79L528.41 406.63L528.41 278.32L343.7 214.16Z" id="j3HSMWlC6"></path><text id="d24KNzc4xV" x="161.44" y="320" font-size="121" font-family="Open Sans" font-weight="normal" font-style="normal" letter-spacing="0" alignment-baseline="before-edge" transform="matrix(1 0 0 1 41.09679101019461 -68.04086538461536)" style="line-height:100%" xml:space="preserve" dominant-baseline="text-before-edge"><tspan x="161.44" dy="0em" alignment-baseline="before-edge" dominant-baseline="text-before-edge" text-anchor="start">SALE</tspan></text><style id="opensansnormalnormal">

    </style></defs><g><g><g><use xlink:href="#j3HSMWlC6" opacity="1" fill="#f50c0c" fill-opacity="1"></use></g><g id="a1EZtJGrTW"><use xlink:href="#d24KNzc4xV" opacity="1" fill="#fbf6f5" fill-opacity="1"></use><g><use xlink:href="#d24KNzc4xV" opacity="1" fill-opacity="0" stroke="#f19fee" stroke-width="0" stroke-opacity="1"></use></g></g></g></g></svg>
`;


// Extend the LitElement base class
class CatalogPageElement extends LitElement {


    /**
     * Implement `render` to define a template for your element.
     *
     * You must provide an implementation of `render` for any element
     * that uses LitElement as a base class.
     */
    render() {
        const products = productsJson["products"];
        const productInfoTemplate = [];

        console.log(`products`, products);
        console.log(`typeOf`, typeof (products));
        for (const [key, value] of Object.entries(products)) {
            console.log(value.sizes);
            productInfoTemplate.push(html`
                <div class="item">
                    <div class="image-wrapper">
                        <img src="${value.image}" alt="${value.name}">
                    </div>
                    <div class="info">
                        <div class="name">${value.name}</div>
                        <div class="regular-price">Regular: ${value.regular_price}</div>
                        <div class="promo-status">${value.on_sale ? html`On Sale:
                            ${saleBanner}
                            ${value.actual_price}
                            ` : `Not on Sale `}</div>
                        <div class="sizes">${value.sizes.filter(isAvailable)
                            .map(size => html`
                            <div class="size">
                                <input type="radio" id=${size.size} name="size-button" value=${size.size} class="size">
                                <label for=${size.size}>${size.size}</label>
                            </div>`)}
                        </div>
                        <button class="button" type="button">
                            Add to cart
                        </button>
                    </div>
                </div>`
            );
        }

        /**
         * `render` must return a lit-html `TemplateResult`.
         *
         * To create a `TemplateResult`, tag a JavaScript template literal
         * with the `html` helper function:
         */
        return html`
    <!-- template content -->
    ${productInfoTemplate}
    `;
    }
    createRenderRoot() {
        /**
         * Render template in light DOM. Note that shadow DOM features like
         * encapsulated CSS are unavailable.
         */
        return this;
    }
}
// Register the new element with the browser.
customElements.define('catalog-page-element', CatalogPageElement);
