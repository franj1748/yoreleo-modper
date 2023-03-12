<?php

// wp_list_hooks('the_content');

/**
 * Eliminar un elemento del menu
 *
 * @param  array  $urls
 *
 * @return array
 */
function prefix_dokan_remove_seller_nav( $urls ) {

    unset( $urls['dashboard'] );
    unset( $urls['settings']['submenu']['social'] );
    unset( $urls['settings']['submenu']['shipping'] );
    unset( $urls['settings']['submenu']['seo'] );

    return $urls;
}

add_filter( 'dokan_get_dashboard_nav', 'prefix_dokan_remove_seller_nav' );

/**
 * Renames an Item title
 *
 * @param  array  $urls
 *
 * @return array
 */
/* function prefix_dokan_edit_seller_nav( $urls ) {

    $urls['products']['title'] = 'Libros';

    return $urls;
}

add_filter( 'dokan_get_dashboard_nav', 'prefix_dokan_edit_seller_nav' ); */


// Agregar campo personalizado de metadato para el peso en el formulario de creación de producto

// Registra el campo personalizado de metadato
register_meta( 'product', '_weight', array(
    'show_in_rest' => true,
    'single' => true,
    'type' => 'string',
) );

register_meta( 'product', '_language', array(
    'show_in_rest' => true,
    'single' => true,
    'type' => 'string',
) );

register_meta( 'product', '_condition', array(
    'show_in_rest' => true,
    'single' => true,
    'type' => 'string',
) );

register_meta( 'product', '_isbn', array(
    'show_in_rest' => true,
    'single' => true,
    'type' => 'string',
) );


// Muestra el campo select en el formulario de añadir producto
function custom_product_metadata_field( $post ) {

    $peso = get_post_meta( $post->ID, '_weight', true );
    $language = get_post_meta( $post->ID, '_language', true );
    $condition = get_post_meta( $post->ID, '_condition', true );
    $isbn = get_post_meta( $post->ID, '_isbn', true );

    ?> 	
        <div class="row mt-4 d-flex justify-content-center align-items-center">
            <div class=" col-lg-3 col-sm-6">
                <div class="form-field">
                    <!-- <label for="_weight"><?php _e( 'Peso', 'modificaciones_personalizadas' ); ?></label> -->
                    <select name="_weight" id="_weight" class="custom-field" required>
                        <option value="">Peso</option>
                        <option value="999" <?php selected( $peso, '999' ); ?> >Hasta 1 Kg</option>
                        <option value="1001" <?php selected( $peso, '1001' ); ?> >Hasta 2 Kg</option>
                    </select>
                </div>
            </div>
            <div class=" col-lg-3 col-sm-6">
                <div class="form-field">
                    <!-- <label for="_language"><?php _e( 'Idioma', 'modificaciones_personalizadas' ); ?></label> -->
                    <select name="_language" id="_language" class="custom-field" required>
                        <option value="">Idioma</option>
                        <option value="español" <?php selected( $language, 'español' ); ?> >Español</option>
                        <option value="inglés" <?php selected( $language, 'inglés' ); ?> >Inglés</option>
                        <option value="catalán" <?php selected( $language, 'catalán' ); ?> >Catalán</option>
                        <option value="gallego" <?php selected( $language, 'gallego' ); ?> >Gallego</option>
                        <option value="euskera" <?php selected( $language, 'euskera' ); ?> >Euskera</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center">
            <div class=" col-lg-3 col-sm-6">
                <div class="form-field">
                    <!-- <label for="_condition"><?php _e( 'Estado', 'modificaciones_personalizadas' ); ?></label> -->
                    <select name="_condition" id="_condition" class="custom-field mb-0" required>
                        <option value="">Estado</option>
                        <option value="nuevo" <?php selected( $condition, 'nuevo' ); ?> >Nuevo</option>
                        <option value="excelente" <?php selected( $condition, 'excelente' ); ?> >Excelente</option>
                        <option value="bueno" <?php selected( $condition, 'bueno' ); ?> >Bueno</option>
                        <option value="satisfactorio" <?php selected( $condition, 'satisfactorio' ); ?> >Satisfactorio</option>
                    </select>
                    <span class="custom-help" style="margin-bottom: 25px;">Recuerda incluir los desperfectos y detalles del libro en la descripción</span>
                </div>
            </div>
            <div class=" col-lg-3 col-sm-6">
                <div class="form-field">
                    <!-- <label for="_isbn"><?php _e( 'ISBN', 'modificaciones_personalizadas' ); ?></label> -->
                    <input class="custom-field mb-0" id="_isbn" type="text" name="_isbn" placeholder=" ISBN 978-3-16-148410-0" value="<?php echo $isbn; ?>" size="40" style="font-size: 17px;" required>
                    <span class="custom-help" style="margin-bottom: 25px;">Suele estar sobre el código de barras y en la página de los derechos de autor.</span>
                </div>
            </div>
        </div>
    <?php
}
add_action( 'dokan_new_product_form', 'custom_product_metadata_field' );

// Guarda el valor del campo select junto con el producto
function custom_product_metadata_save( $product_id ) {

    if ( isset( $_POST['_weight'] ) ) {

        update_post_meta( $product_id, '_weight', sanitize_text_field( $_POST['_weight'] ) );
    }

    if ( isset( $_POST['_language'] ) ) {

        update_post_meta( $product_id, '_language', sanitize_text_field( $_POST['_language'] ) );
    }

    if ( isset( $_POST['_condition'] ) ) {

        update_post_meta( $product_id, '_condition', sanitize_text_field( $_POST['_condition'] ) );
    }

    if ( isset( $_POST['_isbn'] ) ) {

        update_post_meta( $product_id, '_isbn', sanitize_text_field( $_POST['_isbn'] ) );
    }
}
add_action( 'save_post', 'custom_product_metadata_save' );

//Redirección luego de crear un producto
function custom_dokan_new_product_added_updated_redirect( $product_id ) {

    // Establece la URL de redirección
    $redirect_url = home_url( '/dashboard/products/' );;
    
    // Redirige a la URL establecida
    wp_redirect( $redirect_url );
    exit;
}
add_action( 'dokan_new_product_added', 'custom_dokan_new_product_added_updated_redirect' );
add_action( 'dokan_product_updated', 'custom_dokan_new_product_added_updated_redirect' );


/* // Modifica el enlace del perfil en el menú de la cabecera para que tome el usuario conectado dinamicamente. 
function custom_menu_item_url( $items ) {

    $user_id = get_current_user_id();
    $user = get_user_by( 'id', $user_id );
    $user_login = sanitize_title( $user->user_login );
    $custom_store_url = get_option( 'dokan_general' )['custom_store_url'];

    foreach ( $items as &$item ) {

        if ( $item->title == 'Mi perfil' ) { 

            $item->url = 'https://yoreleo.es/' . $custom_store_url . '/' . $user_login;

        }
    }

    return $items;
}
add_filter( 'wp_nav_menu_objects', 'custom_menu_item_url' ); */