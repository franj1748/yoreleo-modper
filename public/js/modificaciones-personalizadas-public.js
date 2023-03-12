// Crear un elemento que permita saber si es la primera vez que un usuario visita la página. 
if (localStorage.getItem('visita') == null){
    localStorage.setItem('visita', 1);
}

// Eliminar la fecha de nacimiento al cerrar sesión
const elementA = Array.from( document.querySelectorAll( 'a' ) );

elementA.forEach( a => {

    if( a.href == 'https://www.yoreleo.es/logout/' ){

        a.addEventListener('click', e => {
        
            localStorage.removeItem("birth_date");
        
        });
    }

} )

// Mostrar botón de añadir al carrito sólo en los productos de la ventana modal. 
const uri = location.origin+'/'+location.pathname.split('/')[1];
if (uri == `${location.origin}/shop`){
    
    const productsLink  = Array.from(document.querySelectorAll('a.woocommerce-LoopProduct-link.woocommerce-loop-product__link'));
    const btnAtoC = productsLink.map(productLink => productLink.nextElementSibling);
    const relacionados = btnAtoC.length == 10 ? 4 : btnAtoC.length == 9 ? 3 : btnAtoC.length == 8 ? 2 : btnAtoC.length == 7 ? 1 : btnAtoC.length == 3 ? 0 : 0;
    const btnAtoCModals = btnAtoC.filter((btn, indice) => indice < (btnAtoC.length - relacionados) / 2);
    const btnAtoCModalsMobile = btnAtoC.filter((btn, indice) => indice >= (btnAtoC.length - relacionados) / 2 && indice < btnAtoC.length - relacionados);
    btnAtoCModals.forEach(btnAtoCModal => {
        btnAtoCModal.style.display = 'block';
        btnAtoCModal.classList.add('product_type_simple', 'add_to_cart_button', 'ajax_add_to_cart', 'elementor-button', 'elementor-size-md', 'text-white');
        btnAtoCModal.style.backgroundColor = '#722620';
    });
    btnAtoCModalsMobile.forEach(btnAtoCModalMobile => {
        btnAtoCModalMobile.style.display = 'block';
        btnAtoCModalMobile.classList.add('product_type_simple', 'add_to_cart_button', 'ajax_add_to_cart', 'elementor-button', 'elementor-size-md', 'text-white');
        btnAtoCModalMobile.style.backgroundColor = '#722620';
    });
}
//-->


// Ocultar opción de transferencia del monedero en la página de mi saldo.
if (uri == `${location.origin}/mi-saldo`){
    
    const tabsTransferenciaSaldo  = document.querySelector('.tabs').firstElementChild;
    tabsTransferenciaSaldo.style.display = 'none';
    
}
//-->

// Aumentar el tamaño de la fuente en los inputs y textareas de la página para evitar el zoom automático al escribir. 
if (document.querySelector('input')){

    const inputs = Array.from(document.querySelectorAll('input'));
    inputs.forEach(input => {
        input.style.fontSize = '17px';
    });
}

if (document.querySelector('textarea')){
    
    const textareas = Array.from(document.querySelectorAll('textarea'));
    textareas.forEach(textarea => {
        textarea.style.fontSize = '17px';
    });

    // const textarea = document.querySelector('#um_message_text');
    // textarea.style.fontSize = '17px';
    //document.querySelector('[name="content"]');
    
}
//-->

// Enviar nombre de usuario en url para la impresión de los libros en la pestaña de actividad. 
const tabLibros = location.search;
const nameTab  = MODPER_const.tab;

if (tabLibros == `?profiletab=${nameTab}`){

    const user = document.querySelector('.um-name').childNodes[1].textContent ? document.querySelector('.um-name').childNodes[1].textContent : '';
    window.location.href = window.location.href + "&user=" + user;
    
}
//-->

// Eliminar los espacios vacios entre los libros de la pestaña de actividad. 
for (let i=1; i < 50; i++){
    
    if(document.querySelector(`.woocommerce.columns-${i}`)){
        document.querySelector(`.woocommerce.columns-${i}`).style.whiteSpace = 'nowrap';
    }
    
}
//-->

// Ocultar el botón de comprar, precio y guardar de los productos que se muestran en la pestaña de actividad de cada usuario. 
if(uri == `${location.origin}/user`){
    
    const precios = Array.from(document.querySelectorAll('span.price'));
    const btns = Array.from(document.querySelectorAll('.add_to_cart_button'));
    const imgProducts = Array.from(document.querySelectorAll('.attachment-woocommerce_thumbnail'));
    
    precios.forEach(precio => {
        precio.style.display = 'none';
    });

    btns.forEach(btn => {
        btn.style.display = 'none';
    });
    
    imgProducts.forEach(img => {
        img.style.borderRadius = '5px';
    });
    
    // Botón de mensajería en perfil de seguidor
    if(document.querySelector('.um-message-btn.um-button')){
        const mensaje_followers = document.querySelector('.um-message-btn.um-button');
        mensaje_followers.style.background = '#722620';
    }
    
}
//-->

//TODO: Separar el código de Dokan y cargarlo sólo en el dashboard. 
//* Dashboard de Dokan. 

const url = `${location.origin}${location.pathname}`;

// Campos de precio en añadir producto como página
if(  url == `${location.origin}/dashboard/new-product/`  ){

    const regularPrice = document.querySelector( '#_regular_price' );
    const tagSearch = document.querySelector( '.product_tag_search' ).parentElement;
    const descriptionLarge = document.querySelector( '#wp-post_content-wrap' );
    const descriptionShort = document.querySelector( '#post-excerpt' );
    const titlePost = document.querySelector( '#post-title' );
    const titlesGeneral = Array.from( document.querySelectorAll( 'h1' ) );
    const btnsGeneral = Array.from( document.querySelectorAll( 'button' ) ); 
    const btnImageUpload = document.querySelector( '.dokan-feat-image-upload > .instruction-inside > a.dokan-feat-image-btn.dokan-btn' );
    const inputImageUpload =  document.querySelector( '.dokan-feat-image-upload > .instruction-inside > input[name="feat_image_id"]' );
    const btnImageGallery = document.querySelector( '.dokan-product-gallery > #dokan-product-images > #product_images_container' );
    
    regularPrice.parentElement.parentElement.parentElement.style.display = 'none';
    descriptionLarge.parentElement.style.display = 'none';
    regularPrice.value = '1';
    tagSearch.style.display = 'none';
    descriptionShort.placeholder = 'Descripción corta del libro, defectos, detalles, opiniones...';
    titlePost.placeholder = 'Nombre del libro';

    titlesGeneral.forEach( title =>{

        if( title.innerText == 'Añadir nuevo producto' ){

            title.innerText = 'Añade tu libro';
            title.classList.add( 'text-center' );
        }
    } )
    
    btnsGeneral.forEach( btn =>{
        
        if( btn.innerText == 'Crear producto' ){
            
            btn.innerText = 'Anunciar libro';

            // Hacer obligatoria la imagen del libro
            btn.addEventListener('click', e => {
            
                if( inputImageUpload.value == 0 || inputImageUpload.value == "" ){

                    e.preventDefault();
                    document.querySelector( '.dokan-feat-image-upload' ).style.border = '4px dashed #d90202' 
                }

                // Input de galería
                const inputImageGalleryUpload =  btnImageGallery.children[1];
                if( inputImageGalleryUpload.value == 0 || inputImageGalleryUpload.value == "" ){

                    e.preventDefault();
                    document.querySelector( 'li.add-image.add-product-images.tips' ).style.border = '4px dashed #d90202' 
                }
            
            });
        } 
        
        if( btn.innerText == 'Crear y añadir nuevo' ){

            btn.style.display = 'none';
        }
        
    } )

    // Estructura y posición de los campos

    // Imágenes
    const rowImageProduct = document.querySelector( '.content-half-part.featured-image' );
    rowImageProduct.style.display = 'flex';
    rowImageProduct.style.justifyContent = 'center';
    rowImageProduct.style.alignItems = 'center';
    rowImageProduct.style.flexDirection = 'column';

    rowImageProduct.children[0].style.display = 'flex';
    rowImageProduct.children[0].style.justifyContent = 'center';
    rowImageProduct.children[0].style.alignItems = 'center';
    rowImageProduct.children[0].width = '100%';

    // Descripción, categoría y nombre
    const rowInformationProduct = document.querySelector( '.content-half-part.dokan-product-meta' );

    rowInformationProduct.style.display = 'flex';
    rowInformationProduct.style.justifyContent = 'center';
    rowInformationProduct.style.alignItems = 'center';
    rowInformationProduct.style.flexDirection = 'column';

    Array.from( rowInformationProduct.children ).forEach( child => {

        child.style.width = '50%';

        if ( child.children[0].tagName == 'TEXTAREA' ) {

            child.children[0].style.boxShadow = 'none';
            child.children[0].style.border = '1px solid #666';
            
        }

        if ( child.tagName == 'SPAN' ) {

            child.children[0].children[0].style.border = '1px solid #666';
            
        }

        if ( window.matchMedia( "( max-width: 430px)" ).matches ) {
            child.style.width = '100%';
        }
    });

    
    // Imagen de portada
    btnImageUpload.innerText = 'Subir imagen de portada'; 
    btnImageUpload.style.fontSize = '15px';
    document.querySelector( '.dokan-feat-image-upload' ).style.height = 'auto';

    //TODO: Validar si esto funciona en iOS sin Safari : Hecho. Si funciona, es un problema de Safari 
    if ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) {

        btnImageUpload.addEventListener( 'click', e => {
            
            document.querySelector( '.dokan-feat-image-upload' ).style.border = '4px dashed #dddddd';
            const inputImageId = document.querySelector( 'input[name="feat_image_id"]' );
            inputImageId.value = 0;
            btnImageUpload.innerText = 'Cargando...'; 
    
            const setImage = setInterval( () => {

                const titleUpload = document.querySelector( '.media-frame-title' );
                titleUpload.style.display = 'none';
                const tabsSelectionUpload = document.querySelector( '.media-frame-router' );
                tabsSelectionUpload.style.display = 'none';
                const maxUploadSizeMessageGeneral = document.querySelector( '.max-upload-size' );
                maxUploadSizeMessageGeneral.style.display = 'none';

                if ( document.querySelector( 'div.attachments-browser.has-load-more' ) ) {

                    const attachmentsBrowser = document.querySelector( 'div.attachments-browser.has-load-more' );
                    attachmentsBrowser.style.display = 'none';                    
                    
                    if ( ! document.querySelector( '#loader' ) ) {
                        
                        const loader = document.createElement( 'div' );
    
                        loader.id = 'loader';
                        attachmentsBrowser.parentNode.appendChild( loader );
                    }
                }
    
                const btnSetImageGeneral = Array.from( document.querySelectorAll( '.media-frame-toolbar > .media-toolbar > .media-toolbar-primary.search-form > button' ) );
                
                btnSetImageGeneral[0].style.display = 'none';
                btnSetImageGeneral[0].click(); 
                console.warn( 'Click desde Imagen de portada' );
    
                if ( inputImageId.value != 0 ) {
                    document.querySelector( '.dokan-feat-image-upload' ).style.height = '200px';
                    clearInterval( setImage );
                }
                
            }, 500);
    
            const clickSelectionFileTimeout = setTimeout( () => {
            
                const btnTabUploadFeatured = document.querySelector( '#menu-item-upload' );
                btnTabUploadFeatured.click();
    
                clearTimeout( clickSelectionFileTimeout );
    
            }, 800);
        });

    }else{

        btnImageUpload.addEventListener( 'click', e => {
    
            document.querySelector( '.dokan-feat-image-upload' ).style.border = '4px dashed #dddddd';
            const inputImageId = document.querySelector( 'input[name="feat_image_id"]' );
            inputImageId.value = 0;
            btnImageUpload.innerText = 'Cargando...'; 
    
            const setImage = setInterval( () => {

                const wordpressUploader = document.querySelector( 'div[id^="__wp-uploader"]' );
                wordpressUploader.style.visibility = 'hidden';
                const btnSetImageGeneral = Array.from( document.querySelectorAll( '.media-frame-toolbar > .media-toolbar > .media-toolbar-primary.search-form > button' ) );
                
                btnSetImageGeneral[0].click(); 
                console.warn( 'Click desde Imagen de portada' );
    
                if ( inputImageId.value != 0 ) {
                    document.querySelector( '.dokan-feat-image-upload' ).style.height = '200px';
                    clearInterval( setImage );
                }
                
            }, 500);
    
            const clickSelectionFileTimeout = setTimeout( () => {
            
                const btnTabUploadFeatured = document.querySelector( '#menu-item-upload' );
                btnTabUploadFeatured.click();
                
                const btnImageSelection = document.querySelector( '.media-frame-tab-panel > .media-frame-content > .uploader-inline > .uploader-inline-content.no-upload-message > .upload-ui > .browser.button.button-hero' );
                btnImageSelection.click();
    
                clearTimeout( clickSelectionFileTimeout );
    
            }, 300);
    
        });
    }

    const deleteImageFeaturedPrime = document.querySelector( '.close.dokan-remove-feat-image' );

    deleteImageFeaturedPrime.addEventListener('click', e => {
    
        const btnImageUpload = document.querySelector( '.dokan-feat-image-upload > .instruction-inside > a.dokan-feat-image-btn.dokan-btn' );
        btnImageUpload.innerText = 'Subir imagen de portada'; 
        document.querySelector( '.dokan-feat-image-upload' ).style.height = 'auto';
    
    });

    // Imagen de contraportada

    // Elemento de lista
    const liAddProductImages =  btnImageGallery.children[0].children[0];

    // Icono de nube
    const icon = document.createElement( 'i' );
    icon.classList.add( 'fas', 'fa-cloud-upload-alt' );
    icon.style.color = '#aaaaaa';
    icon.style.padding = '0';
    liAddProductImages.insertBefore( icon, btnImageGallery.children[0].children[0].children[0] );

    // Enlace
    const linkAddProductImages =  btnImageGallery.children[0].children[0].children[1];
    linkAddProductImages.innerText = 'Subir imagen de contraportada'; 
    linkAddProductImages.style.fontSize = '13px'; 
    linkAddProductImages.style.width = 'auto'; 
    linkAddProductImages.style.height = 'auto'; 
    linkAddProductImages.style.color = '#8f8f8f'; 
    linkAddProductImages.id = 'gallery'; 

    liAddProductImages.style.width = '200px'; 
    liAddProductImages.style.height = 'auto'; 
    liAddProductImages.style.border = '4px dashed #ddd'; 
    liAddProductImages.style.cursor = 'default'; 
    liAddProductImages.style.lineHeight = 'inherit'; 

    if ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) {

        linkAddProductImages.addEventListener( 'click', e => {

            liAddProductImages.style.border = '4px dashed #dddddd';
            const inputImageIdGallery = document.querySelector( 'input[name="product_image_gallery"]' );
            linkAddProductImages.innerText = 'Cargando...'; 

            const setImageGallery = setInterval( () => {

                const titlesGallery = Array.from( document.querySelectorAll( '.media-frame-title' ) );
                titlesGallery[1].style.display = 'none';
                const tabsSelectionGallery = Array.from( document.querySelectorAll( '.media-frame-router' ) );
                tabsSelectionGallery[1].style.display = 'none';
                const maxUploadsSizeMessage = Array.from( document.querySelectorAll( '.max-upload-size' ) );
                maxUploadsSizeMessage[1].style.display = 'none';

                const attachmentsBrowserGallery = Array.from( document.querySelectorAll( 'div.attachments-browser.has-load-more' ) );

                if ( attachmentsBrowserGallery.length > 1 ) {

                    attachmentsBrowserGallery[1].style.display = 'none';                    
                    
                    if ( ! document.querySelector( '#loaderGallery' ) ) {
                        
                        const loaderGallery = document.createElement( 'div' );
    
                        loaderGallery.id = 'loaderGallery';
                        attachmentsBrowserGallery[1].parentNode.appendChild( loaderGallery );
                    }
                }

                const btnSetImageGeneralGallery1 = Array.from( document.querySelectorAll( '.media-frame-toolbar > .media-toolbar > .media-toolbar-primary.search-form > button' ) );

                btnSetImageGeneralGallery1[1].style.display = 'none';
                btnSetImageGeneralGallery1[1].click(); 
                console.warn( 'Click desde Imagen de contraportada' );

                if ( inputImageIdGallery.value != 0 ) {
                    liAddProductImages.style.height = '200px';
                    clearInterval( setImageGallery );
                }

            }, 500);

            const clickSelectionGalleryTimeout = setTimeout( () => {

                const btnSetImageGeneralGallery2 = Array.from( document.querySelectorAll( '.media-frame-toolbar > .media-toolbar > .media-toolbar-primary.search-form > button' ) );

                btnSetImageGeneralGallery2[1].addEventListener( 'click', e => {

                    if( btnImageGallery.children[0].children[0].children[0].tagName == 'IMG' ){

                        btnImageGallery.children[0].children[1].style.display = 'none';
                        btnImageGallery.children[0].children[0].style.width = '200px';
                        btnImageGallery.children[0].children[0].style.height = '200px';

                    }
                    
                    const deleteImg = document.querySelector( '.action-delete' );

                    if ( deleteImg ) {
                        
                        deleteImg.addEventListener('click', e => {
                        
                            const liAddImageShow = setTimeout( () => {
                            
                                btnImageGallery.children[0].children[0].style.display = 'block'; 
                                linkAddProductImages.innerText = 'Subir imagen de contraportada'; 
                                liAddProductImages.style.height = 'auto';
                                inputImageIdGallery.value = 0;
                                clearTimeout( liAddImageShow );

                            }, 350);
                        });
                    }

                } )

                const btnTabsUploadGallery = Array.from( document.querySelectorAll( '#menu-item-upload' ) );
                btnTabsUploadGallery[1].click();

                clearTimeout( clickSelectionGalleryTimeout );

            }, 800);
                
        });

    }else{

        linkAddProductImages.addEventListener( 'click', e => {

            liAddProductImages.style.border = '4px dashed #dddddd';
            const inputImageIdGallery = document.querySelector( 'input[name="product_image_gallery"]' );
            linkAddProductImages.innerText = 'Cargando...'; 

            const setImageGallery = setInterval( () => {

                const wordpressUploaderGallery = Array.from( document.querySelectorAll( 'div[id^="__wp-uploader"]' ) );
                console.log( wordpressUploaderGallery );
                wordpressUploaderGallery[2].style.visibility = 'hidden';
                const btnSetImageGeneral = Array.from( document.querySelectorAll( '.media-frame-toolbar > .media-toolbar > .media-toolbar-primary.search-form > button' ) );

                btnSetImageGeneral[1].click(); 
                console.warn( 'Click desde Imagen de contraportada' );

                if ( inputImageIdGallery.value != 0 ) {
                    liAddProductImages.style.height = '200px';
                    clearInterval( setImageGallery );
                }

            }, 500);

            const clickSelectionGalleryTimeout = setTimeout( () => {

                const btnSetImageGeneral = Array.from( document.querySelectorAll( '.media-frame-toolbar > .media-toolbar > .media-toolbar-primary.search-form > button' ) );

                btnSetImageGeneral[1].addEventListener( 'click', e => {

                    if( btnImageGallery.children[0].children[0].children[0].tagName == 'IMG' ){

                        btnImageGallery.children[0].children[1].style.display = 'none';
                        btnImageGallery.children[0].children[0].style.width = '200px';
                        btnImageGallery.children[0].children[0].style.height = '200px';

                    }
                    
                    const deleteImg = document.querySelector( '.action-delete' );

                    if ( deleteImg ) {
                        
                        deleteImg.addEventListener('click', e => {
                        
                            const liAddImageShow = setTimeout( () => {
                            
                                btnImageGallery.children[0].children[0].style.display = 'block'; 
                                linkAddProductImages.innerText = 'Subir imagen de contraportada'; 
                                liAddProductImages.style.height = 'auto';
                                inputImageIdGallery.value = 0;
                                clearTimeout( liAddImageShow );

                            }, 350);
                        });
                    }

                } )

                const btnTabUploadGallery = document.querySelector( '#menu-item-upload' );
                btnTabUploadGallery.click();
                
                const btnImageSelection = document.querySelector( '.media-frame-tab-panel > .media-frame-content > .uploader-inline > .uploader-inline-content.no-upload-message > .upload-ui > .browser.button.button-hero' );
                btnImageSelection.click();

                clearTimeout( clickSelectionGalleryTimeout );
            }, 350);
                
        });
    }
    
}

// Productos
if( url == `${location.origin}/dashboard/products/` ){

    // Tabla de productos
    if( document.querySelector( '#dokan-product-list-table' ) ){

        const dashboardProductListing = document.querySelector( '.dokan-dashboard-content.dokan-product-listing' );
        const titleHead = document.createElement( 'h1' );
        titleHead.classList.add( 'entry-title' );
        titleHead.textContent = 'Mis Libros';

        dashboardProductListing.insertBefore( titleHead, dashboardProductListing.firstChild );

        const tableProduct = document.querySelector( '#dokan-product-list-table' );
        
        const tableTh = Array.from( tableProduct.querySelectorAll( 'th' ) );
        const tableTd = Array.from( tableProduct.querySelectorAll( 'td' ) );
        
        const tableColumn = {
            Estado: 'Estado',
            SKU: 'SKU',
            Inventario: 'Inventario',
            Precio: 'Precio',
            Ganancias: 'Ganancias',
            Tipo: 'Tipo',
            Visualizaciones: 'Visualizaciones',
            Fecha: 'Fecha'
        }
        
        tableTh.forEach( th => {
        
            if( th.textContent in tableColumn ){
        
                th.style.display = 'none';
            }
        
        } )
        
        tableTd.forEach( td => {
        
            if( td.getAttribute("data-title") in tableColumn ){
        
                td.style.display = 'none';
            }
    
            hideOnSmallScreen( td );
    
            window.addEventListener( "resize", hideOnSmallScreen );
        } )

    }

}

// Oculta las filas de la tabla en dispositivos pequeños
function hideOnSmallScreen( tableRow ) {
    
    if ( window.matchMedia( "( max-width: 430px)" ).matches && tableRow.getAttribute( "data-title" ) != 'Nombre' && tableRow.getAttribute( "data-title" ) != 'Imagen') {
        tableRow.classList.add( 'hidden' );
    }

    if ( tableRow.getAttribute( "data-title" ) == 'Nombre') {

        tableRow.parentElement.classList.add( 'is-expanded' );
    }
}

// Ordenes
if( url == `${location.origin}/dashboard/orders/` ){

    // Tabla de pedidos
    if ( document.querySelector( '.dokan-table-striped' ) ) {
        
        const tableOrders = document.querySelector( '.dokan-table-striped' );
        
        const tableTh = Array.from( tableOrders.querySelectorAll( 'th' ) );
        const tableTd = Array.from( tableOrders.querySelectorAll( 'td' ) );
        
        const tableColumn = {
            Ganancias: 'Ganancias',
            Envío: 'Envío',
            Acción: 'Acción',
            'Total del pedido': 'Total del pedido'
        }
        
        tableTh.forEach( th => {
        
            if( th.textContent in tableColumn ){
        
                th.style.display = 'none';
            }
        
        } )
        
        tableTd.forEach( td => {
        
            if( td.getAttribute("data-title") in tableColumn ){
        
                td.style.display = 'none';
            }
        
        } )
    
    }
    
    // Detalle del pedido
    if ( document.querySelector( '.dokan-order-details-wrap' ) ) {
        
        const downloadableProductPermissions = document.querySelector( '.order_download_permissions' ).parentElement.parentElement; 
        const shippingStatusTracking = document.querySelector( '#dokan-order-shipping-status-tracking-shippments' ).parentElement.parentElement;
        const orderNotes = document.querySelector( '#dokan-order-notes' ).parentElement;
        downloadableProductPermissions.style.display = 'none';
        shippingStatusTracking.style.display = 'none';
        orderNotes.style.display = 'none';
    }
}

// Formulario de edición de producto

// Tipo de producto
if( document.querySelector( '#product_type' ) ){

    // Titulo del formulario
    const titleForm = document.querySelector( '.dokan-dashboard-content.dokan-product-edit > .dokan-dashboard-header.dokan-clearfix > h1.entry-title' );
    const seeBookBtn = titleForm.children[1].children[0];

    titleForm.innerText = 'Editar libro';
    if( seeBookBtn ){

        seeBookBtn.innerText = 'Ver libro';
    }

    // Botón de enviar edición 
    const btnSendEdition = document.querySelector( 'form.dokan-product-edit-form > #publish' );

    btnSendEdition.value = 'Guardar libro';

    // Campos innecesarios
    const typeProductParent       = document.querySelector( '#product_type' ).parentElement;
    const typeProductVirtual      = document.querySelector( '.virtual-checkbox' ) ?? document.querySelector( '.dokan-other-options' );
    const typeProductDownloadable = document.querySelector( '.downloadable-checkbox' ) ?? document.querySelector( '.dokan-seo-product-options' );
    const catalogMode             = document.querySelector( '.dokan-catalog-mode' );

    // El panel de opciones para enriquecer el texto, servido por un iframe que carga en el DOM luego de algunos segundos 
    const openRichText = setInterval( () => {

        const richTextOptions         = document.querySelector( '#wp-post_excerpt-editor-container > .mce-tinymce.mce-container.mce-panel > .mce-container-body.mce-stack-layout > .mce-top-part.mce-container.mce-stack-layout-item.mce-first' );

        if( richTextOptions ){

            richTextOptions.style.display = 'none';
            console.info( 'Encontrado' );
            clearInterval( openRichText );

        }
        console.info( 'Searching...' );

    }, 500)
    
    typeProductParent.style.display = 'none';
    typeProductVirtual.style.display = 'none';
    typeProductDownloadable.style.display = 'none';
    catalogMode.style.display = 'none';
    
    // Precios
    const priceProductParent = document.querySelector( '.regular-price' ).parentElement;
    priceProductParent.style.display = 'none';
    
    // Etiquetas
    const tagProductParent = document.querySelector( '#product_tag_edit' ).parentElement;
    tagProductParent.style.display = 'none';

    // Botón de agregar imagen del libro para editar el cargador de medios
    // Imagen de portada
    const deleteImageFeatured = document.querySelector( '.close.dokan-remove-feat-image' );

    deleteImageFeatured.addEventListener('click', e => {
    
        const btnImageUpload = document.querySelector( '.dokan-feat-image-upload.dokan-new-product-featured-img > .instruction-inside > a.dokan-feat-image-btn.btn.btn-sm' );
        const boxImageFeatured = document.querySelector( '.dokan-feat-image-upload.dokan-new-product-featured-img' );

        boxImageFeatured.style.height = '200px';

        modifyWordPressMediaUploaderFeatured( btnImageUpload );
    
    });

    // Imagen de contraportada
    const liAddImageEdit = setTimeout( () => {
        
        const btnImageGallery = document.querySelector( '.dokan-product-gallery > #dokan-product-images > #product_images_container' );

        // Enlace
        const linkAddProductImages =  btnImageGallery.children[0].children[0].children[0];
        // Elemento de lista
        const liAddProductImages =  btnImageGallery.children[0].children[1];
        
        liAddProductImages.style.display = 'none';

        const deleteImageFeatured = document.querySelector( '.action-delete' );

        deleteImageFeatured.addEventListener('click', e => {

            const liAddImageShowEdit = setTimeout( () => {
            
                btnImageGallery.children[0].children[0].style.display = 'block';
                
                btnImageGallery.children[0].children[0].children[0].addEventListener( 'click', e => {
                    
                    const clickSelectionGalleryTimeoutEdit = setTimeout( () => {
            
                        const btnSetImage = document.querySelector( '.media-frame-toolbar > .media-toolbar > .media-toolbar-primary.search-form > button.button.media-button' );
                        btnSetImage.innerText = 'Establecer imagen';
        
                        btnSetImage.addEventListener( 'click', e => {
        
                            if( btnImageGallery.children[0].children[0].children[0].tagName == 'IMG' ){
        
                                btnImageGallery.children[0].children[1].style.display = 'none';
        
                            }
        
                        } )
            
                        const btnTabBrowse = document.querySelector( '#menu-item-browse' );
                        btnTabBrowse.innerText = 'Subidos';
            
                        const btnTabUpload = document.querySelector( '#menu-item-upload' );
                        btnTabUpload.click();
                        
                        const btnImageSelection = document.querySelector( '.media-frame-tab-panel > .media-frame-content > .uploader-inline > .uploader-inline-content.no-upload-message > .upload-ui > .browser.button.button-hero' );
                        btnImageSelection.click();
            
                        clearTimeout( clickSelectionGalleryTimeoutEdit );
                        
                    }, 350);
                    
                });
                
                clearTimeout( liAddImageShowEdit );

            }, 250);

        });

        clearTimeout( liAddImageEdit );
        
    }, 1500); 

}

// Ajustes de tienda
if( url == `${location.origin}/dashboard/settings/store/` ){

    const formGroupPerPag = document.querySelector( '#dokan_store_ppp' ).parentElement.parentElement;
    const formGroupNameStore = document.querySelector( '#dokan_store_name' ).parentElement.parentElement.children[0];
    const formGroupStoreTime = document.querySelector( '#dokan-store-time-enable' ).parentElement.parentElement.parentElement.parentElement;
    const formGroupMoreProdcut = document.querySelector( 'input[name="setting_show_more_ptab"]' ).parentElement.parentElement.parentElement.parentElement;
    // const formGroupTnc = document.querySelector( '#dokan_store_tnc_enable' ).parentElement.parentElement.parentElement.parentElement;

    formGroupPerPag.style.display = 'none';
    formGroupNameStore.textContent = 'Nombre del perfil';
    formGroupStoreTime.style.display = 'none';
    formGroupMoreProdcut.style.display = 'none';
    // formGroupTnc.style.display = 'none';

    
}

// Método de pago
if( url == `${location.origin}/dashboard/settings/payment/` ){

    const help = document.querySelector( '.dokan-page-help' );
    help.innerText = 'Estos son los métodos de retirada disponibles para ti. Por favor, actualiza tu información de pago a continuación para poder enviar solicitudes de retirada, y así obtener los pagos de tus intercambios sin problemas.'

    
}

// Conexión de cuenta MangoPay 
if ( url == `${location.origin}/dashboard/settings/payment-manage-dokan_mangopay-edit/` ) {
    
    document.querySelector( 'body' ).style.display = 'none';

    if ( document.querySelector( '#dokan-mangopay-payment > #dokan-mangopay-account-notice' ) ) {


        // Preloader mientras se conecta la cuenta de MangoPay
        const preLoader = document.createElement( 'div' );
        const loader = document.createElement( 'div' );
        const preLoaderText = document.createElement( 'div' );

        preLoader.id = 'preloader';
        loader.id = 'loader';
        preLoaderText.id = 'preloader-text';
        preLoader.appendChild( loader );
        preLoader.appendChild( preLoaderText );
        document.querySelector( 'body' ).appendChild( preLoader );
        document.querySelector( 'body' ).style.display = 'flex';

        const messages = [
            "Espere...",
            "Estamos creando su perfil...",
            "Ahora estamos leyendo un libro...",
            "Faltan algunas páginas del libro...",
            "Casi listo...",
            "Un poco más..."
        ];

        const totalMessages = messages.length;
        let index = 0;

        function changeText() {

            preLoaderText.innerHTML = messages[ index ];
            index++;

            if (index === totalMessages) {
                clearInterval( timerId );
            }
        }
        
        const timerId = setInterval( changeText, 700 ); 

        // Conexión de cuenta automática de MangoPay
        const inputDateBirthday        = document.querySelector( '#dokan-mangopay-user-birthday' );
        const inputStateP              = document.querySelector( '#dokan-mangopay-state_field' );
        const inputCheckTerms          = document.querySelector( '#dokan-mangopay-terms' );
        const btnAccountConnect        = document.querySelector( '#dokan-mangopay-account-connect' );
        const btnUpdatePaymentSettings = document.querySelector( 'input[name="dokan_update_payment_settings"]' );
        const paymentForm              = document.querySelector( '#payment-form' );
        const accountNotice            = document.querySelector( '#dokan-mangopay-payment > #dokan-mangopay-account-notice' );
        const labelMangoPay            = document.querySelector( 'label[for="dokan_setting"]' );
        const labelEstate              = document.querySelector( 'label[for="dokan-mangopay-state"] > span' );
        const titleSeccion             = document.querySelector( '.entry-title' );
        const ElementsA                = Array.from( document.querySelectorAll( 'a' ) );
        
        const dateBirthdayVerification = setInterval(() => {
            
            let dateBirthdayUm = localStorage.getItem( 'birth_date' );

            if( dateBirthdayUm ){

                dateBirthdayUm          = dateBirthdayUm.trim();
                inputDateBirthday.value = dateBirthdayUm;
                clearInterval( dateBirthdayVerification );
            }


        }, 500);

        ElementsA.forEach( a => {

            if ( a.href == 'https://yoreleo.es/dashboard/settings/payment/' ) {
                a.style.display = 'none';
            }

        } )
        
        inputCheckTerms.checked                 = true;
        // inputCheckTerms.parentElement.innerText = 'He leído y acepto los Términos y Condiciones de YoReleo';
        accountNotice.style.display             = 'none';
        labelMangoPay.style.visibility          = 'hidden';
        titleSeccion.textContent                = 'Método de Pago';
        btnAccountConnect.innerText             = 'Registrar datos';
        labelEstate.innerText                   = '*';
        btnUpdatePaymentSettings.style.display  = 'none';
        
        
        btnUpdatePaymentSettings.style.pointerEvents = 'none';
        paymentForm.style.pointerEvents = 'none'; 
    
        // Eliminar el campo de estado del formulario
        while ( inputStateP.firstChild ) {
            inputStateP.removeChild( inputStateP.firstChild );
        }
        
        window.addEventListener( 'load', () => {
            
            btnUpdatePaymentSettings.style.pointerEvents = 'auto';
            btnUpdatePaymentSettings.click();        
            btnUpdatePaymentSettings.style.pointerEvents = 'none';
    
            const setUpdate = setInterval( () => {
                
                if( document.querySelector( '.dokan-ajax-response > .dokan-alert.dokan-alert-success > p' ) ){
                    
                    paymentForm.style.pointerEvents = 'auto';
                    localStorage.setItem( 'visited-payment-method', '1' );
                    btnAccountConnect.click();
                    paymentForm.style.pointerEvents = 'none';
                    clearInterval( setUpdate );
                }
                
            }, 900);
            
        }); 

    }else{

        document.querySelector( 'body' ).style.display = 'none';

        if( localStorage.getItem( 'visited-payment-method' ) == '1' ){

            // Preloader mientras se conecta la cuenta de MangoPay
            const preLoader = document.createElement( 'div' );
            const loader = document.createElement( 'div' );
            const preLoaderText = document.createElement( 'div' );

            preLoader.id = 'preloader';
            loader.id = 'loader';
            preLoaderText.id = 'preloader-text';
            preLoader.appendChild( loader );
            preLoader.appendChild( preLoaderText );
            document.querySelector( 'body' ).appendChild( preLoader );
            document.querySelector( 'body' ).style.display = 'flex';

            const messages = [
                "Ya casi está...",
                "¡Comencemos!"
            ];

            const totalMessages = messages.length;
            let index = 0;

            function changeText() {

                preLoaderText.innerHTML = messages[ index ];
                index++;

                if (index === totalMessages) {
                    clearInterval( timerId );
                }
            }
            
            const timerId = setInterval( changeText, 1000 );
            
            localStorage.setItem( 'visited-payment-method', '2' );
            window.location.href = `${location.origin}/home/`;
        }

        document.querySelector( 'body' ).style.display = 'flex'; 
        //const accountConnect         = document.querySelector( 'li[data-id="account"]' );
        //const accountTabConnect      = document.querySelector( '#dokan-mangopay-account' );
        const walletsActive            = document.querySelector( 'li[data-id="wallets"]' );
        const bankAccountConnect       = document.querySelector( 'li[data-id="bank-account"]' );
        const alertDanger              = document.querySelector( '.dokan-alert.dokan-alert-danger.dokan-text-middle' );
        const alertSucces              = document.querySelector( '#dokan-mangopay-payment > .dokan-alert.dokan-alert-success.dokan-text-middle' );
        const btnUpdatePaymentSettings = document.querySelector( 'input[name="dokan_update_payment_settings"]' );
        const btnAccountDisconnect     = document.querySelector( 'button#dokan-mangopay-account-disconnect' );
        const labelMangoPay            = document.querySelector( 'fieldset.payment-field-dokan_mangopay > .dokan-form-group > label' );
        const uploadImageKyc           = document.querySelector( '#dokan-kyc-file' );
        const btnBack                  = document.querySelector( 'article.dokan-settings-area > a' );
        const titleSettings            = document.querySelector( 'header.dokan-dashboard-header > .dokan-store-settign-header-wrap > h1' );
        
        //accountConnect.style.display = 'none';
        //accountTabConnect.style.display = 'none';
        //walletsActive.style.display = 'none';
        btnUpdatePaymentSettings.style.display = 'none';
        btnAccountDisconnect.style.display = 'none';
        btnBack.style.display = 'none';
        labelMangoPay.style.visibility = 'hidden';
        titleSettings.textContent = 'Método de pago';

        if( alertDanger ){
            
            alertDanger.textContent = `Asegúrese de verificar todos los documentos KYC requeridos (Verificación). Además, debe agregar una cuenta bancaria activa.`;
        }

        if( alertSucces ){
            
            alertSucces.style.display = 'none';
        }
        
        uploadImageKyc.style.width = '100%';
        bankAccountConnect.click();
        
    }

} 

// Redirección de campos sin uso del dashboard de Dokan
const dashboardPanel = `${location.origin}/dashboard/`
const inaccessibleLinks = {

    seo : `${dashboardPanel}settings/seo/`,
    edit : `${dashboardPanel}edit-account/`,
    store : `${dashboardPanel}settings/store/`,
    social : `${dashboardPanel}settings/social/`,
    orders : `${dashboardPanel}orders/`,
    coupons : `${dashboardPanel}coupons/`,
    reports : `${dashboardPanel}reports/`,
    reviews : `${dashboardPanel}reviews/`,
    shipping : `${dashboardPanel}settings/shipping/#/`,
    settings : `${dashboardPanel}settings/`,
    dashboard : `${dashboardPanel}`,
    announcement : `${dashboardPanel}announcement/`,

}

const bodyNone = () => document.querySelector( 'body' ).style.display = 'none'

const existsUrl = ( obj, url ) => {
    
    return Object.values( obj ).find( val => val === url);
}

const valueMatch = existsUrl( inaccessibleLinks, url );

if ( valueMatch ) {

    switch ( true ) {

        case valueMatch.includes('settings'):
            bodyNone()
            window.location.href = `${location.origin}/account/` 
        break;
        case valueMatch.includes('orders'):
            bodyNone()
            window.location.href = `${location.origin}/account/orders/` 
        break;
        case valueMatch.includes('coupons'):
            bodyNone()
            window.location.href = `${location.origin}/como-funciona/` 
        break;
        case valueMatch.includes('edit-account'):
            bodyNone()
            window.location.href = `${location.origin}/account/general/` 
        break;
        case valueMatch.includes('reports') || valueMatch.includes('reviews'):
            bodyNone()
            window.location.href = `${location.origin}/user/` 
        break;
        case valueMatch.includes('announcement'):
            bodyNone()
            window.location.href = `${location.origin}/account/notifications/` 
        break;
        default:
            bodyNone()
            window.location.href = `${location.origin}`
        break;
    }
}

// Modificaciones de la página del checkout
const urlCheckout = localStorage.getItem( 'url_checkout' ) ? localStorage.getItem( 'url_checkout' ).trim() : '';

if ( url ==  urlCheckout ) {
    
    // Ocultar el campo de búsqueda en el campo de selección de estado
    const searchInputField = setInterval(() => {
        
        const searchField = document.querySelector( 'input.select2-search__field' );
        if ( searchField ) {
            
            searchField.style.display = 'none';
            clearInterval( searchInputField );
        }

    }, 500);

    // Placeholders a los campos del formulario
    const pFieldsCheckout = Array.from( document.querySelectorAll( 'div[class^="woocommerce-billing-fields"] > p' ) )

    pFieldsCheckout.forEach( pfield => {
    
        if( pfield.id == 'billing_company_field' || pfield.id == 'billing_address_2_field' || pfield.id == 'billing_country_field' || pfield.id == 'user_mp_status_field'){

            pfield.style.display = 'none';

        }

        if( pfield.id == 'billing_state_field' || pfield.id == 'billing_city_field' || pfield.id == 'billing_postcode_field'){

            pfield.style.width = '33%';
            pfield.style.display = 'inline-block';

        }

        pfield.children[0].style.display = 'none';
        pfield.style.marginBottom = '13px';

        switch( pfield.id ){

            case 'billing_first_name_field':
                pfield.children[1].children[0].placeholder = 'Nombre';
            break;
            case 'billing_last_name_field':
                pfield.children[1].children[0].placeholder = 'Apellido';
            break;
            case 'billing_city_field':
                pfield.children[1].children[0].placeholder = 'Población';
            break;
            case 'billing_postcode_field':
                pfield.children[1].children[0].placeholder = 'Código postal';
            break;
            case 'billing_phone_field':
                pfield.children[1].children[0].placeholder = 'Teléfono';
            break;
            case 'billing_email_field':
                pfield.children[1].children[0].placeholder = 'Email';
            break;
            case 'user_mp_status_field':
                pfield.children[1].children[0].value = 'individual';
            break;
            case 'user_birthday_field':
                pfield.children[1].children[0].placeholder = 'Fecha de nacimiento';
            break;
            default:
                //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
            break;

        }
    
    } )

    // Mover de posición las secciones
    const orderHeading = document.querySelector('#order_review_heading');
    const orderReview = document.querySelector('#order_review');
    const orderTable = document.querySelector('.woocommerce-checkout-review-order-table');
    const billingFields = document.querySelector('.woocommerce-billing-fields');
    const col1 = document.querySelector('.col-1');
    const col2 = document.querySelector('.col-2');
    const horizontalRule = document.createElement( 'hr' );
    horizontalRule.style.opacity = '.15';
    horizontalRule.style.margin = '0 80px 1rem 0';
    const verticalRule = '<div id="vr-checkout" class="vr" style="height: 70vh;"></div>';

    col1.appendChild( orderHeading );
    col1.appendChild( horizontalRule );
    col1.appendChild( orderTable );
    col1.insertAdjacentHTML( 'afterend', verticalRule );
    col2.appendChild( billingFields );
    col2.appendChild( orderReview );
    
    // Fuente de los titulos 
    const headingsSeccion = Array.from( document.querySelectorAll( 'h3' ) );
        
    headingsSeccion.forEach( heading => {

        heading.style.fontSize   = '2.4rem';
        heading.style.fontFamily = '"Quicksand", Sans-serif';
        heading.style.fontWeight = '600';
        heading.style.lineHeight = '1.5';
        heading.style.color      = '#722620';

        if ( heading.textContent == 'Dirección' ) {

            const horizontalRuleBillingFields = document.createElement( 'hr' );
            horizontalRuleBillingFields.style.opacity = '.15';
            horizontalRuleBillingFields.style.marginRight = '80px';

            heading.parentNode.insertBefore( horizontalRuleBillingFields, heading.nextSibling );
        }

    } )

    // Agregar a la tabla de orden la imagen para cada producto
    function updateProductThumbnails() {

        const urlsImg = JSON.parse( localStorage.getItem( 'thumbnailCart' ) );
        const productNamesItemCart = Array.from( document.querySelectorAll( 'td.product-name' ) );
    
        productNamesItemCart.forEach( productName => {
    
            if ( ! productName.querySelector( 'img' ) ) {

                const nameProduct = productName.innerText.split( '×' )[ 0 ].trim();
                const img = document.createElement( 'img' );
                const imgUrl = urlsImg[ nameProduct ]; // obtener la URL de la imagen correspondiente
        
                if ( imgUrl ) {
                    img.setAttribute( 'src', imgUrl );
                    img.setAttribute( 'alt', 'image-product' );
                    img.classList.add( 'img-thumbnail' );
                    img.style.width = '100px';
                    img.style.height = '100px';

                    if  ( window.innerWidth < 768 ) {
                        img.style.display = 'block';
                    }
                    
                    productName.insertBefore( img, productName.firstChild ); // agregar imagen al elemento td
                }
            }
        });
        
    }

    const imgThumbnailOrder = setInterval( () => {

        if ( localStorage.getItem( 'thumbnailCart' ) ) {

            setInterval( updateProductThumbnails, 500);

            clearInterval( imgThumbnailOrder );
        }

    }, 900);

    // Modificar sección de método de pago
    /* const paymentTypeRegisteredCard = document.querySelector( '#dokan-mangopay-payment-type-registeredcard' );
    paymentTypeRegisteredCard.checked = true;
    
    const btnPlaceOrder = setInterval(() => {
        
        const buttonPlaceOrder = document.querySelector( '#place_order' );
        if ( buttonPlaceOrder ) {
            
            buttonPlaceOrder.style.color = '#ffffff';
            clearInterval( btnPlaceOrder );
        }

    }, 500); */

}


if (  url == `${location.origin}/dashboard/withdraw/` ){

    const requestWithdrawal = document.querySelector( '#dokan-request-withdraw-button' ).parentElement; 
    const dokanWithdrawDisplayRequests = document.querySelector( '#dokan-withdraw-display-requests-button' ).parentElement; 
    const title = document.querySelector( '.dokan-withdraw-area > header.dokan-dashboard-header > h1' ); 
    const dokanWithdrawArea = document.querySelector( '.dokan-withdraw-area > .entry-content' ); 
    const btnMangoPaySettings = document.createElement( 'a' );
    
    btnMangoPaySettings.href = `${location.origin}/dashboard/settings/payment-manage-dokan_mangopay-edit/`;
    btnMangoPaySettings.classList.add( 'dokan-btn' );
    btnMangoPaySettings.id = 'manage-payment-method';
    btnMangoPaySettings.textContent = 'Gestionar método de pago';
    dokanWithdrawArea.appendChild( btnMangoPaySettings );
    
    
    requestWithdrawal.style.position = 'relative';
    requestWithdrawal.style.marginTop = '20px';
    dokanWithdrawDisplayRequests.style.position = 'relative';
    dokanWithdrawDisplayRequests.style.marginTop = '20px';
    title.textContent = 'Mi Saldo';

}


// Modificar cargador de medios de WordPress
function modifyWordPressMediaUploaderFeatured( btnUploadFeatured ){

    btnUploadFeatured.innerText = 'Subir imagen de portada'; 
    btnUploadFeatured.style.fontSize = '15px';
    btnUploadFeatured.addEventListener( 'click', e => {
        
        document.querySelector( '.dokan-feat-image-upload' ).style.border = '4px dashed #dddddd';
        const inputImageId = document.querySelector( 'input[name="feat_image_id"]' );

        const setImage = setInterval( () => {
            
            const btnSetImageFeatured = document.querySelector( '.media-frame-toolbar > .media-toolbar > .media-toolbar-primary.search-form > button.button.media-button' );
            btnSetImageFeatured.innerText = 'Establecer imagen';
            btnSetImageFeatured.click(); 
            btnUploadFeatured.innerText = 'Cargando...'; 

            if ( inputImageId.value != 0 ) {
                clearInterval( setImage );
            }
            
        }, 300);
        
        const clickSelectionFileTimeout = setTimeout( () => {
            
            const btnTabBrowse = document.querySelector( '#menu-item-browse' );
            btnTabBrowse.innerText = 'Subidos';
            
            const btnTabUpload = document.querySelector( '#menu-item-upload' );
            btnTabUpload.click();
            
            const btnImageSelection = document.querySelector( '.media-frame-tab-panel > .media-frame-content > .uploader-inline > .uploader-inline-content.no-upload-message > .upload-ui > .browser.button.button-hero' );
            btnImageSelection.click();

            clearTimeout( clickSelectionFileTimeout );

        }, 200);
    
    });

} 

//-->

// Eliminar la etiqueta meta de viewport existente para que se agregue una nueva mediante PHP. 
document.querySelector('meta[name="viewport"]').remove();



/*
// Funciones antiguas
// Eliminar el cuadro de agregar post en la pestaña social activity
if(document.querySelector('.um-activity-publish')){
    document.querySelector('.um-activity-publish').style.display = 'none';
}

// Cambiar el texto del campo de agregar imagen
if(document.querySelector('#featured_image')){
    document.querySelector('#featured_image :nth-child(2)').firstChild.textContent = 'Clic para añadir imagen';
}

const origen = location.origin;
const path = location.pathname;
const array = path.split('/');
const uri = origen + '/' + array[1];

// Cambiar el texto de la pestaña de actividad
if(uri == 'https://www.leogratis.com/user'){
    document.querySelector('.um-profile-nav-activity > a:nth-child(2) > span').textContent = 'Libros';
}

// Rellenar y ocultar los campos del formulario del front que el usuario desee. 
const slugId  = MODPER_const.slugs.split(',');
const valores = MODPER_const.valores.split(',');
let i = 0;
slugId.forEach(slug => {

    if(document.querySelector(`#${slug}`)){
        document.querySelector(`#${slug}`).style.display = 'none';
        document.querySelector(`#${slug}`).value = `${valores[i]}`;
        i++;
    }else{
        i++;
    }

}); 
*/