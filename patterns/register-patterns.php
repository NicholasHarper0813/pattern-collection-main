<?php
/**
 * Register patterns.
 */

add_action( 'init', 'bpc_register_block_pattern_categories' );
add_action( 'init', 'bpc_register_block_patterns' );

/**
 * Register Patterns
 */
function bpc_register_block_patterns() {
	if ( function_exists( 'register_block_pattern' ) ) {

		/**
		 * Stats Pattern
		 */
		register_block_pattern(
			'bpc/stats',
			[
				'title' => __( 'Stats', 'block-patterns-collection' ),
				'description' => __( 'Stats pattern', 'block-patterns-collection' ),
				'categories' => ['patterns collection'],
				'content' => "<!-- wp:group {\"gradient\":\"cool-to-warm-spectrum\",\"style\":{\"color\":{\"text\":\"#0071a1\"}}} -->\n<div class=\"wp-block-group has-cool-to-warm-spectrum-gradient-background has-text-color has-background\" style=\"color:#0071a1\"><div class=\"wp-block-group__inner-container\"><!-- wp:columns -->\n<div class=\"wp-block-columns\"><!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:heading {\"align\":\"center\",\"level\":4,\"textColor\":\"background\"} -->\n<h4 class=\"has-text-align-center has-background-color has-text-color\">Stats 1</h4>\n<!-- /wp:heading -->\n\n<!-- wp:heading {\"align\":\"center\",\"level\":3,\"textColor\":\"subtle-background\"} -->\n<h3 class=\"has-text-align-center has-subtle-background-color has-text-color\">30%</h3>\n<!-- /wp:heading --></div>\n<!-- /wp:column -->\n\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:heading {\"align\":\"center\",\"level\":4,\"textColor\":\"background\"} -->\n<h4 class=\"has-text-align-center has-background-color has-text-color\">Stats 2</h4>\n<!-- /wp:heading -->\n\n<!-- wp:heading {\"align\":\"center\",\"level\":3,\"textColor\":\"subtle-background\"} -->\n<h3 class=\"has-text-align-center has-subtle-background-color has-text-color\">80%</h3>\n<!-- /wp:heading --></div>\n<!-- /wp:column -->\n\n<!-- wp:column -->\n<div class=\"wp-block-column\"><!-- wp:heading {\"align\":\"center\",\"level\":4,\"textColor\":\"background\"} -->\n<h4 class=\"has-text-align-center has-background-color has-text-color\">Stats 2</h4>\n<!-- /wp:heading -->\n\n<!-- wp:heading {\"align\":\"center\",\"level\":3,\"textColor\":\"subtle-background\"} -->\n<h3 class=\"has-text-align-center has-subtle-background-color has-text-color\">90%</h3>\n<!-- /wp:heading --></div>\n<!-- /wp:column --></div>\n<!-- /wp:columns --></div></div>\n<!-- /wp:group -->"
			]
		);

		/**
		 * Heading Text Buttons Pattern
		 */
		register_block_pattern(
			'bpc/heading-text-buttons',
			[
				'title' => __( 'Heading Text buttons', 'block-patterns-collection' ),
				'description' => __( 'Heading Text buttons', 'block-patterns-collection' ),
				'categories' => ['patterns collection'],
				'content' => "<!-- wp:group {\"style\":{\"color\":{\"background\":\"#aaa6a6\"}}} -->\n<div class=\"wp-block-group has-background\" style=\"background-color:#aaa6a6\"><div class=\"wp-block-group__inner-container\"><!-- wp:heading -->\n<h2>Heading</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:buttons -->\n<div class=\"wp-block-buttons\"><!-- wp:button -->\n<div class=\"wp-block-button\"><a class=\"wp-block-button__link\">View More 1</a></div>\n<!-- /wp:button -->\n\n<!-- wp:button -->\n<div class=\"wp-block-button\"><a class=\"wp-block-button__link\">View more 2</a></div>\n<!-- /wp:button --></div>\n<!-- /wp:buttons --></div></div>\n<!-- /wp:group -->"
			]
		);
	}
}

/**
 * Register block pattern categories
 */
function bpc_register_block_pattern_categories() {

	register_block_pattern_category(
		'patterns collection',
		[ 'label' =>__( 'Patterns Collection', 'block-patterns-collection' ) ]
	);
}