<?php
/**
 * Plugin Name: Heventos Gutenberg Buttons
 * Plugin URI: https://example.com/
 * Description: Adiciona controles combináveis de cor, variante, formato, tamanho e hover ao bloco core/button no Gutenberg.
 * Version: 0.1.0
 * Author: Heventos
 * Text Domain: heventos
 */

if (!defined('ABSPATH')) {
    exit;
}

function heventos_button_style_options(): array
{
    return [
        ['name' => 'primary', 'label' => __('Primary', 'heventos')],
        ['name' => 'secondary', 'label' => __('Secondary', 'heventos')],
        ['name' => 'success', 'label' => __('Success', 'heventos')],
        ['name' => 'danger', 'label' => __('Danger', 'heventos')],
        ['name' => 'warning', 'label' => __('Warning', 'heventos')],
        ['name' => 'info', 'label' => __('Info', 'heventos')],
        ['name' => 'light', 'label' => __('Light', 'heventos')],
        ['name' => 'dark', 'label' => __('Dark', 'heventos')],
        ['name' => 'link', 'label' => __('Link', 'heventos')],
        ['name' => 'outline', 'label' => __('Outline', 'heventos')],
        ['name' => 'outline-secondary', 'label' => __('Outline Secondary', 'heventos')],
        ['name' => 'outline-light', 'label' => __('Outline Light', 'heventos')],
        ['name' => 'ghost', 'label' => __('Ghost', 'heventos')],
        ['name' => 'pill', 'label' => __('Pill', 'heventos')],
        ['name' => 'square', 'label' => __('Square', 'heventos')],
        ['name' => 'size-sm', 'label' => __('Size Small', 'heventos')],
        ['name' => 'size-md', 'label' => __('Size Medium', 'heventos')],
        ['name' => 'size-lg', 'label' => __('Size Large', 'heventos')],
        ['name' => 'size-xl', 'label' => __('Size XL', 'heventos')],
        ['name' => 'hover-lift', 'label' => __('Hover Lift', 'heventos')],
        ['name' => 'hover-glow', 'label' => __('Hover Glow', 'heventos')],
        ['name' => 'hover-sweep', 'label' => __('Hover Sweep', 'heventos')],
    ];
}

add_action('init', function (): void {
    foreach (heventos_button_style_options() as $style) {
        register_block_style('core/button', [
            'name' => $style['name'],
            'label' => $style['label'],
        ]);
    }
});

add_action('enqueue_block_editor_assets', function (): void {
    $baseUrl = plugin_dir_url(__FILE__);
    $basePath = plugin_dir_path(__FILE__);

    wp_enqueue_style(
        'heventos-gutenberg-button-styles',
        $baseUrl . 'assets/editor.css',
        [],
        filemtime($basePath . 'assets/editor.css')
    );

    wp_enqueue_script(
        'heventos-gutenberg-button-controls',
        $baseUrl . 'assets/editor.js',
        ['wp-block-editor', 'wp-components', 'wp-compose', 'wp-element', 'wp-hooks', 'wp-i18n'],
        filemtime($basePath . 'assets/editor.js'),
        true
    );
});