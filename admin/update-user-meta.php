<?php
// Al registrar un nuevo usuario.
add_action( 'user_register', '_modper_register_user_vendor', 10, 1 );
function _modper_register_user_vendor( $user_id ) {
 
    // Se crea la opción en la tabla user_meta del tipo de cartera.
    update_user_meta($user_id, '_vendor_payment_mode', 'wps_wallet');
    
    // /*  Abrimos la puerta de enlace si no está disponible para pagar */
    // if ( empty( Meta::get_mangopay_account_id( $user_id ) ) ) {
    //     return true;
    // }

    // // Verifique si el vendedor tiene elegibilidad de pago
    // if ( ! PayOut::is_user_eligible( $user_id ) ) {
    //     return true;
    // }
            
    // return true;
    
}