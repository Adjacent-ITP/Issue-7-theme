<?php get_header(); ?>

<body>

	<?php get_template_part( './phps/_header' ); ?>
	<?php get_template_part( './phps/_body' ); ?>

	<script type="text/javascript" src="<?php echo get_bloginfo('template_directory'); ?>/public/js/main.js"></script>
</body>

<?php get_footer(); ?>
