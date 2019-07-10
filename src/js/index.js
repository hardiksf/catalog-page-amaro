import _ from 'lodash';
import '../sass/styles.sass'
import { html, render } from 'lit-html';

import './catalog-page-element';
const renderCatalogPave = html `<catalog-page-element></catalog-page-element>`
render(renderCatalogPave, document.body);