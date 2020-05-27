<?php get_header(); ?>

<body
	style="background-image:url('<?php echo get_bloginfo('template_directory'); ?>/public/assets/bg.jpg')"
	<?php if(is_front_page()) { echo "class='homepage'"; } ?>
>

	<?php get_template_part( './phps/_header' ); ?>
	<?php get_template_part( './phps/_body' ); ?>

	<?php get_footer(); ?>

	<script type="text/javascript" src="<?php echo get_bloginfo('template_directory'); ?>/public/js/main.js"></script>
</body>
