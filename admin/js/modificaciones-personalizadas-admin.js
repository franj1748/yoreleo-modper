// Eliminar mensajes de plugins del panel de administración. 

if ( document.querySelector( '.um-admin-notice' ) ){
    document.querySelector( '.um-admin-notice' ).style.display = 'none';
}

if ( document.querySelector( '.notice-warning' ) ){
    const noticeWarning = Array.from( document.querySelectorAll( '.notice-warning' ) );
    noticeWarning.forEach( notice => {
        notice.style.display = 'none';
    } );
}

if ( document.querySelector( '.wpuf-license-notice' ) ){
    document.querySelector( '.wpuf-license-notice' ).style.display = 'none';
}

if ( document.querySelector( '.dce-generic-notice' ) ){
    document.querySelector( '.dce-generic-notice' ).style.display = 'none';
}

// Cambiar el estado a activo de los vendedores registrados en Dokan automáticamente
const pageVendors = `${location.search}${location.hash}`;
const pageDokanVendors = `?page=dokan#/vendors`;

if( pageVendors == pageDokanVendors ){

    const checkInputInterval = setInterval( () => {

        const inputsState = Array.from( document.querySelectorAll( '.switch.tips'  ) );
    
        inputsState.forEach( input => {
    
            input.children[0].checked = true; 
            clearInterval( checkInputInterval );
    
        } )

    }, 500);

}
