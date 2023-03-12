<?php

// Eliminar mensaje se ha añadido a tu carrito
add_filter('wc_add_to_cart_message_html', '__return_null()');

// Código corto para obtener el usuario actual.
add_shortcode('usuario', '_modper_obtener_usuario');
function _modper_obtener_usuario(){

    // Se obtiene el ID del usuario actual
    $member_ID = get_current_user_id();

    // Si no hay ningún usuario registrado, memberID será 0
    if ($member_ID != 0) {
        // Se obtiene la información completa del usuario mediante su ID
        $member_Info = get_userdata($member_ID);
        $miembro_Rol = $member_Info->roles;
        $miembro_actual = $miembro_Rol[0];
        // De la información obtenida, sólo se toma el nombre de usuario 
        $member_Login_Name = $member_Info->first_name;
        $member_Login_Last = $member_Info->last_name;
        if ($member_Login_Name == "") {
            $member_Login_Name = $member_Info->user_login;
        }
        ob_start();
        ?>
            <p id="wp_usuario" class="wp_usuario_res">
                <?php echo 'Rol de usuario: ' . $miembro_actual . '<br> Nombre: ' . $member_Login_Name . ' ' . $member_Login_Last; ?>
            </p>
        <?php
        $salida = ob_get_contents();
        ob_end_clean();
        return $salida;
    } else {
        return 'No hay ningún usuario registrado';
    }
}

add_shortcode('user_gravatar', '_modper_obtener_gravatar');
function _modper_obtener_gravatar(){

    // Se obtiene el ID del usuario actual
    $member_ID = get_current_user_id();

    // Si no hay ningún usuario registrado, memberID será 0
    if ($member_ID != 0) {

        // Se obtiene la imagen del avatar del usuario conectado.
        $url_avatar = get_avatar_url($member_ID);
        ob_start();
    ?>
        <img alt="gravatar" src="<?php echo $url_avatar; ?>" style="width: 50%;"><br><br>
    <?php
        $salida = ob_get_contents();
        ob_end_clean();
        return $salida;
    } else {
        return 'No hay ningún usuario registrado';
    }
}

/*Mostrar los productos creados por cada usuario en la pestaña de libros*/
add_shortcode('user_front', '_modper_obtener_user_to_js');
function _modper_obtener_user_to_js(){

    if (isset($_GET['user'])) {
        // Asignar user a una variable PHP
        $user_front = $_GET['user'];
        // Retornar variable userwindows
        return $user_front;
    }
}

// Mostrar los productos en la pestaña de libros según el usuario. 
add_shortcode('modper_wcmp_products', '_modper_wcmp_show_products');
function _modper_wcmp_show_products($atts){


    if (empty($atts))
        return '';

    // Obtiene el nombre de usuario del que se quieren mostrar los productos
    $user_front = _modper_obtener_user_to_js();

    // Obtiene el objeto de usuario a partir del nombre de usuario
    $user = get_user_by('login', $user_front);

    // Obtiene el ID del usuario
    $user_id = $user ? $user->ID : '';

    extract(shortcode_atts(array(
        'id' => $user_id,
        'columns' => '4',
        'orderby' => 'title',
        'order' => 'asc'
    ), $atts));

    $args = array(
        'post_type' => 'product',
        'post_status' => 'publish',
        'ignore_sticky_posts' => 1,
        'orderby' => $orderby,
        'order' => $order,
        'posts_per_page' => -1,
        'author' => $user_id
    );

    if (!empty($id)) {
        $term_id = get_user_meta($id, '_vendor_term_id', true);
        $args['tax_query'][] = array(
            'taxonomy' => 'dc_vendor_shop',
            'field' => 'term_id',
            'terms' => $term_id
        );
    }

    if (isset($atts['skus'])) {
        $skus = explode(',', $atts['skus']);
        $skus = array_map('trim', $skus);
        $args['meta_query'][] = array(
            'key' => '_sku',
            'value' => $skus,
            'compare' => 'IN'
        );
    }

    if (isset($atts['ids'])) {
        $ids = explode(',', $atts['ids']);
        $ids = array_map('trim', $ids);
        $args['post__in'] = $ids;
    }

    ob_start();

    $products = new WP_Query(apply_filters('wcmp_shortcode_products_query', $args, $atts, 'modper_wcmp_products'));

    $woocommerce_loop['columns'] = $columns;

    if ($products->have_posts()) :
    ?>

        <?php woocommerce_product_loop_start(); ?>

        <?php while ($products->have_posts()) : $products->the_post(); ?>

            <?php wc_get_template_part('content', 'product'); ?>

        <?php endwhile; // end of the loop. ?>

        <?php woocommerce_product_loop_end(); ?>

    <?php else: ?>
        <?php do_action('woocommerce_no_products_found'); ?>
    <?php endif;

    wp_reset_postdata();

    return '<div class="woocommerce columns-' . $columns . '">' . ob_get_clean() . '</div>';



   /*  global $woocommerce_loop, $WCMp;

    if (empty($atts))
        return '';

    $user_front = _modper_obtener_user_to_js();

    extract(shortcode_atts(array(
        'id' => '',
        'vendor' => $user_front,
        'columns' => '4',
        'per_page' => get_option('posts_per_page'),
        'orderby' => 'title',
        'order' => 'asc'
    ), $atts));

    $user = false;
    if (!empty($vendor)) {
        if (get_user_by('login', $vendor)) {
            $user = get_user_by('login', $vendor);
        } else if (get_user_by('slug', $vendor)) {
            $user = get_user_by('slug', $vendor);
        } else if (get_user_by('email', $vendor)) {
            $user = get_user_by('email', $vendor);
        } else if (get_user_by('ID', $vendor)) {
            $user = get_user_by('ID', $vendor);
        }
    }

    $args = array(
        'post_type' => 'product',
        'post_status' => 'publish',
        'ignore_sticky_posts' => 1,
        'orderby' => $orderby,
        'order' => $order,
        'posts_per_page' => $per_page
    );

    if (!empty($vendor) && !empty($user)) {
        $term_id = get_user_meta($user->ID, '_vendor_term_id', true);
        $args['tax_query'][] = array(
            'taxonomy' => $WCMp->taxonomy->taxonomy_name,
            'field' => 'term_id',
            'terms' => $term_id
        );
    } else if (!empty($id)) {
        $term_id = get_user_meta($id, '_vendor_term_id', true);
        $args['tax_query'][] = array(
            'taxonomy' => $WCMp->taxonomy->taxonomy_name,
            'field' => 'term_id',
            'terms' => $term_id
        );
    }

    if (isset($atts['skus'])) {
        $skus = explode(',', $atts['skus']);
        $skus = array_map('trim', $skus);
        $args['meta_query'][] = array(
            'key' => '_sku',
            'value' => $skus,
            'compare' => 'IN'
        );
    }

    if (isset($atts['ids'])) {
        $ids = explode(',', $atts['ids']);
        $ids = array_map('trim', $ids);
        $args['post__in'] = $ids;
    }


    ob_start();

    $products = new WP_Query(apply_filters('wcmp_shortcode_products_query', $args, $atts, 'modper_wcmp_products'));


    $woocommerce_loop['columns'] = $columns;

    if ($products->have_posts()) :
    ?>

        <?php woocommerce_product_loop_start(); ?>

        <?php while ($products->have_posts()) : $products->the_post(); ?>

            <?php wc_get_template_part('content', 'product'); ?>

        <?php endwhile; // end of the loop.  
        ?>

        <?php woocommerce_product_loop_end(); ?>

    <?php
    else :
    ?>
        <?php
        do_action('woocommerce_no_products_found');
        ?>
    <?php
    endif;

    wp_reset_postdata();

    return '<div class="woocommerce columns-' . $columns . '">' . var_dump($products->have_posts()) . ob_get_clean() . '</div>'; */
}

/* Cantidad de Bookcoins del usuario registrado */
/* add_shortcode('bookcoins', '_modper_obtener_bookcoins');
function _modper_obtener_bookcoins(){

    $member_ID = get_current_user_id();
    $bookcoin  = get_user_meta($member_ID, '_gamipress_bookcoin_points', true);


    return '<div class="bookcoin d-flex justify-content-center"><h5><strong>Tienes <svg xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 375 375" height="50"><defs><clipPath id="a"><path d="M 37.5 37.5 L 337.5 37.5 L 337.5 337.5 L 37.5 337.5 Z M 37.5 37.5"/></clipPath></defs><g clip-path="url(#a)"><path fill="#722620" d="M 337.5 187.5 C 337.5 270.328125 270.328125 337.5 187.5 337.5 C 104.671875 337.5 37.5 270.328125 37.5 187.5 C 37.5 104.671875 104.671875 37.5 187.5 37.5 C 270.328125 37.5 337.5 104.671875 337.5 187.5 Z M 337.5 187.5"/></g><path fill="#ECECEC" d="M 135 262.5 L 135 112.5 L 196.492188 112.5 C 214.566406 112.5 228.246094 115.988281 237.59375 122.960938 C 246.9375 129.9375 251.59375 140.160156 251.59375 153.609375 C 251.59375 160.957031 249.71875 167.4375 246 173.03125 C 242.25 178.628906 237.039062 182.730469 230.355469 185.339844 C 237.976562 187.273438 243.976562 191.136719 248.371094 197.003906 C 252.773438 202.824219 255 209.941406 255 218.40625 C 255 232.824219 250.433594 243.75 241.289062 251.160156 C 232.148438 258.570312 219.140625 262.351562 202.238281 262.5 Z M 165 172.5 L 197.722656 172.5 C 213.195312 172.238281 220.957031 166.320312 220.957031 154.164062 C 220.957031 147.367188 218.992188 142.46875 215.070312 139.484375 C 211.148438 136.5 204.960938 135 196.492188 135 L 165 135 Z M 165 195 L 165 240 L 201.328125 240 C 208.539062 240 225 236.484375 225 220.433594 C 225 204.382812 216.621094 195.203125 202.5 195 Z M 165 195"/><path fill="#ECECEC" d="M 157.5 90 L 180 90 L 180 127.5 L 157.5 127.5 Z M 195 90 L 217.5 90 L 217.5 127.5 L 195 127.5 Z M 157.5 247.5 L 180 247.5 L 180 285 L 157.5 285 Z M 195 247.5 L 217.5 247.5 L 217.5 285 L 195 285 Z M 195 247.5"/></svg>' . $bookcoin . ' bookcoins</strong></h5></div>';
} */

// Mostrar botón de compra que abre modal de complementos en desktop.
add_shortcode('modper_add_to_cart_url', '_modper_wc_add_to_cart_url');
function _modper_wc_add_to_cart_url($atts){

    $member_ID = get_current_user_id();
    $bookcoin = get_user_meta($member_ID, '_gamipress_bookcoin_points', true);
    $options = get_option('modper_options');

    if ($bookcoin == 0) {
        echo '<div class="modal modal-alert position-static d-block bg-white show" tabindex="-1" role="dialog" id="noBookcoin">
                  <div class="modal-dialog my-0" role="document">
                    <div class="modal-content rounded-4">
                      <div class="modal-body p-2 text-center">
                        <h5 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Sad</title><circle cx="184" cy="232" r="24"/><path d="M256 288c45.42 0 83.62 29.53 95.71 69.83a8 8 0 01-7.87 10.17H168.15a8 8 0 01-7.82-10.17C172.32 317.53 210.53 288 256 288z"/><circle cx="328" cy="232" r="24"/><circle cx="256" cy="256" r="208" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg></h5>
                        <p class="mb-0">Necesitas 1 BookCoin para comprar este libro.<a type="button" id="subirLibro" rel="nofollow" href="' . $options['modper_vender'] . '" class="elementor-button elementor-size-md w-100" style="border-radius: 20px;" role="button"><span class="elementor-button-content-wrapper">Consigue uno aquí</a></p>
                      </div>
                    </div>
                  </div>
                </div>';
    } else {

        $host = 'https://' . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
        $product_id = url_to_postid($host);

        ob_start();

        echo '<div class="elementor-element elementor-element-868c96c elementor-add-to-cart--align-center elementor-widget__width-initial elementor-widget elementor-widget-global elementor-global-8311 elementor-widget-wc-add-to-cart" data-id="868c96c" data-element_type="widget" data-widget_type="wc-add-to-cart.modper"><div class="elementor-widget-container"><div class="elementor-button-wrapper"><a type="button" data-bs-toggle="modal" data-bs-target="#modalComplementarios" id="modper_add_to_cart" rel="nofollow" href="#modalComplementarios" class="product_type_simple add_to_cart_button ajax_add_to_cart elementor-button elementor-size-md w-100" role="button"><span class="elementor-button-content-wrapper"><span class="elementor-button-text">COMPRAR</span></span></a></div></div></div>';

    ?>
        <div id="modalComplementarios" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalComplementariosLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header text-center" style="padding: 1px 30px;">
                        <h5 class="modal-title text-center" id="modalComplementariosLabel"><strong>Antes de terminar la compra, complementa tu lectura.</strong></h5>
                        <button id="cerrar" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body mt-0 desbor" style="padding: 16px 20px;">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <!-- Se llena con los prodcutos que pertenezcan a la categoría de complementos -->
                                    <?php
                                    $atts = array_merge(
                                        array(
                                            'limit'        => '12',
                                            'columns'      => '3',
                                            'orderby'      => 'menu_order title',
                                            'order'        => 'ASC',
                                            'category'     => 'complementos',
                                            'cat_operator' => 'IN',
                                        ),
                                        (array) $atts
                                    );

                                    $shortcode = new MP_Shortcode_Products($atts, 'product_category');
                                    echo $shortcode->get_content();
                                    ?>
                                    <div id="sub_modalComplementarios" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="sub_modalComplementariosLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
                                            <div class="modal-content" style="height: 100%;">
                                                <div class="modal-header text-center">
                                                    <a id="sub_cerrar" role="button" data-bs-dismiss="modal" aria-label="Close">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                                                            <title>Atrás</title>
                                                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M249.38 336L170 256l79.38-80M181.03 256H342" />
                                                            <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
                                                        </svg>
                                                    </a>
                                                    <h5 class="modal-title text-center" id="sub_modalComplementariosLabel"><strong></strong></h5>
                                                </div>
                                                <div class="modal-body mt-4">
                                                    <div class="container">
                                                        <div class="row">
                                                            <div id="column_contenedor" class="col-md-12">
                                                                <!-- Se llena con la respuesta de la petición AJAX -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer" style="padding: 5px 20px;">
                        <a id="checkout" rel="nofollow" href="?add-to-cart=<?php echo $product_id ?>" data-quantity="1" data-product_id="<?php echo $product_id ?>" class="product_type_simple add_to_cart_button ajax_add_to_cart elementor-button elementor-size-md" style="padding: 5px 20px;" role="button">
                            <span class="elementor-button-content-wrapper d-flex justify-content-center align-items-center">
                                Continuar compra <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                                    <title>Continuar</title>
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M262.62 336L342 256l-79.38-80M330.97 256H170" />
                                    <path d="M256 448c106 0 192-86 192-192S362 64 256 64 64 150 64 256s86 192 192 192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
                                </svg></span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <script type="text/javascript">
            const popUp = document.querySelector('#modper_add_to_cart');
            const modal = document.querySelector('#modalComplementarios');
            const body = document.querySelector('body');
            const modalBody = document.querySelectorAll('.modal-body');
            let valorStorage = localStorage.getItem('visita');
            popUp.addEventListener('click', e => {
                e.preventDefault();
                modal.classList.add('show');
                modal.style.display = 'block';
                body.style.overflow = 'hidden';

                if (valorStorage == '1') {
                    if (modalBody[0].scrollHeight > modalBody[0].clientHeight) {
                        jQuery('.desbor').animate({
                            scrollTop: '403'
                        }, 1500);
                        jQuery('.desbor').animate({
                            scrollTop: '0'
                        }, 1000);
                        localStorage.setItem('visita', 2);
                        valorStorage = localStorage.getItem('visita');
                    }
                }

                if (e.target.id == 'modper_add_to_cart' || e.target.tagName == 'SPAN') {
                    const cerrar = document.querySelector('#cerrar');
                    const checkout = document.querySelector('#checkout');
                    const intervalOn = setTimeout(() => {
                        opacity = Number(window.getComputedStyle(modal).getPropertyValue("opacity"));
                        if (opacity < 1 && opacity !== 1) {
                            opacity += 1;
                            modal.style.opacity = opacity;
                            clearTimeout(intervalOn);
                        }
                    }, 200);
                    cerrar.addEventListener('click', e => {
                        e.preventDefault();
                        modal.style.display = 'none';
                        body.style.overflow = 'visible';
                        const intervalOff = setTimeout(() => {
                            opacity = Number(window.getComputedStyle(modal).getPropertyValue("opacity"));
                            if (opacity == 1) {
                                opacity -= 1;
                                modal.style.opacity = opacity;
                                clearTimeout(intervalOff);
                            }
                        }, 200);
                    })
                    // Obtener la url del checkout mediante el guardado de ajax. 
                    checkout.addEventListener('click', e => {
                        checkout.firstElementChild.innerHTML = 'Continuar compra <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" style="width: 32px;"><path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite" /></path></svg>';
                        setTimeout(() => {
                            window.location.href = localStorage.getItem('url_checkout');
                        }, 4000);

                    });
                }
            });
        </script>
    <?php

        return ob_get_clean();
    }
}

// Mostrar botón de compra que abre modal de complementos en mobile.
add_shortcode('modper_add_to_cart_url_mobile', '_modper_wc_add_to_cart_url_mobile');
function _modper_wc_add_to_cart_url_mobile($atts){

    $member_ID = get_current_user_id();
    $bookcoin = get_user_meta($member_ID, '_gamipress_bookcoin_points', true);
    $options = get_option('modper_options');

    if ($bookcoin == 0) {
        echo '<div class="modal modal-alert position-static d-block bg-white show" tabindex="-1" role="dialog" id="noBookcoin">
                  <div class="modal-dialog my-0" role="document">
                    <div class="modal-content rounded-4">
                      <div class="modal-body p-2 text-center">
                        <h5 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Sad</title><circle cx="184" cy="232" r="24"/><path d="M256 288c45.42 0 83.62 29.53 95.71 69.83a8 8 0 01-7.87 10.17H168.15a8 8 0 01-7.82-10.17C172.32 317.53 210.53 288 256 288z"/><circle cx="328" cy="232" r="24"/><circle cx="256" cy="256" r="208" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg></h5>
                        <p class="mb-0">Necesitas 1 BookCoin para comprar este libro.<a type="button" id="subirLibro_mobile" rel="nofollow" href="' . $options['modper_vender'] . '" class="elementor-button elementor-size-md w-100" style="border-radius: 20px;" role="button"><span class="elementor-button-content-wrapper">Consigue uno aquí</a></p>
                      </div>
                    </div>
                  </div>
                </div>';
    } else {

        $host = 'https://' . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
        $product_id = url_to_postid($host);

        ob_start();

        echo '<div class="elementor-element elementor-element-868c96d elementor-add-to-cart--align-center elementor-widget__width-initial elementor-widget elementor-widget-global elementor-global-8311 elementor-widget-wc-add-to-cart" data-id="868c96d" data-element_type="widget" data-widget_type="wc-add-to-cart.modper"><div class="elementor-widget-container"><div class="elementor-button-wrapper"><a type="button" data-bs-toggle="modal" data-bs-target="#modalComplementarios_mobile" id="modper_add_to_cart_mobile" rel="nofollow" href="#modalComplementarios_mobile" class="product_type_simple add_to_cart_button ajax_add_to_cart elementor-button elementor-kit-70 elementor-size-md w-100" role="button" style="background-color: #722620;border-radius: 20px;"><span class="elementor-button-content-wrapper"><span class="elementor-button-text">COMPRAR</span></span></a></div></div></div>';

    ?>
        <div id="modalComplementarios_mobile" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalComplementariosLabel_mobile" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header text-center" style="padding: 2px 30px;">
                        <h5 class="modal-title text-center" style="font-size: 19px;" id="modalComplementariosLabel_mobile"><strong>Complementa tu lectura</strong></h5>
                        <button id="cerrar_mobile" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body mt-0 desbor">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <!-- Se llena con los prodcutos que pertenezcan a la categoría de complementos -->
                                    <?php
                                    $atts = array_merge(
                                        array(
                                            'limit'        => '12',
                                            'columns'      => '2',
                                            'orderby'      => 'menu_order title',
                                            'order'        => 'ASC',
                                            'category'     => 'complementos',
                                            'cat_operator' => 'IN',
                                        ),
                                        (array) $atts
                                    );

                                    $shortcode = new MP_Shortcode_Products($atts, 'product_category');
                                    echo $shortcode->get_content_mobile();
                                    ?>
                                    <div id="sub_modalComplementarios_mobile" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="sub_modalComplementariosLabel_mobile" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
                                            <div class="modal-content" style="height: 100%;">
                                                <div class="modal-header text-center">
                                                    <a id="sub_cerrar_mobile" role="button" data-bs-dismiss="modal" aria-label="Close"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                                                            <title>Atrás</title>
                                                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M249.38 336L170 256l79.38-80M181.03 256H342" />
                                                            <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
                                                        </svg></a>
                                                    <h5 class="modal-title text-center" id="sub_modalComplementariosLabel_mobile"><strong></strong></h5>
                                                </div>
                                                <div class="modal-body mt-4">
                                                    <div class="container">
                                                        <div class="row">
                                                            <div id="column_contenedor_mobile" class="col-md-12">
                                                                <!-- Se llena con la respuesta de la petición AJAX -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer" style="padding: 5px 20px;">
                        <a id="checkout_mobile" rel="nofollow" href="?add-to-cart=<?php echo $product_id ?>" data-quantity="1" data-product_id="<?php echo $product_id ?>" class="product_type_simple add_to_cart_button ajax_add_to_cart elementor-button elementor-size-md mt-0 mb-0" style="padding: 5px 20px;" role="button">
                            <span class="elementor-button-content-wrapper d-flex justify-content-center align-items-center">
                                Continuar compra <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                                    <title>Continuar</title>
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M262.62 336L342 256l-79.38-80M330.97 256H170" />
                                    <path d="M256 448c106 0 192-86 192-192S362 64 256 64 64 150 64 256s86 192 192 192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
                                </svg></span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <script type="text/javascript">
            const popUp_mobile = document.querySelector('#modper_add_to_cart_mobile');
            const modal_mobile = document.querySelector('#modalComplementarios_mobile');
            const body_mobile = document.querySelector('body');
            const modalBody_mobile = document.querySelectorAll('.modal-body');
            let valorStorage_mobile = localStorage.getItem('visita');
            popUp_mobile.addEventListener('click', e => {
                e.preventDefault();
                modal_mobile.classList.add('show');
                modal_mobile.style.display = 'block';
                body_mobile.style.overflow = 'hidden';

                if (valorStorage_mobile == '1') {
                    if (modalBody_mobile[2].scrollHeight > modalBody_mobile[2].clientHeight) {
                        jQuery('.desbor').animate({
                            scrollTop: '403'
                        }, 1000);
                        jQuery('.desbor').animate({
                            scrollTop: '0'
                        }, 1000);
                        localStorage.setItem('visita', 2);
                        valorStorage_mobile = localStorage.getItem('visita');
                    }
                }

                if (e.target.id == 'modper_add_to_cart_mobile' || e.target.tagName == 'SPAN') {
                    const cerrar_mobile = document.querySelector('#cerrar_mobile');
                    const checkout_mobile = document.querySelector('#checkout_mobile');
                    const intervalOnMobile = setTimeout(() => {
                        opacity = Number(window.getComputedStyle(modal_mobile).getPropertyValue("opacity"));
                        if (opacity < 1 && opacity !== 1) {
                            opacity += 1;
                            modal_mobile.style.opacity = opacity;
                            clearTimeout(intervalOnMobile);
                        }
                    }, 200);
                    cerrar_mobile.addEventListener('click', e => {
                        e.preventDefault();
                        modal_mobile.style.display = 'none';
                        body_mobile.style.overflow = 'visible';
                        const intervalOffMobile = setTimeout(() => {
                            opacity = Number(window.getComputedStyle(modal_mobile).getPropertyValue("opacity"));
                            if (opacity == 1) {
                                opacity -= 1;
                                modal_mobile.style.opacity = opacity;
                                clearTimeout(intervalOffMobile);
                            }
                        }, 200);
                    })
                    checkout_mobile.addEventListener('click', e => {
                        checkout_mobile.firstElementChild.innerHTML = 'Continuar compra <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" style="width: 32px;"><path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite" /></path></svg>';
                        setTimeout(() => {
                            window.location.href = localStorage.getItem('url_checkout');
                        }, 4000);

                    })
                }
            });
        </script>
<?php

        return ob_get_clean();
    }
}
