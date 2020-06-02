<div class="about">
	<div class="about__row -logo">
		<img src="<?php echo get_bloginfo('template_directory'); ?>/public/assets/logo.svg" alt="logo" class="about__logo">
	</div>

	<div class="about__content">
	<?php while (have_posts()) : ?>
		<?php the_post(); ?>

		<?php the_content(); ?>

	<?php endwhile; ?>
	</div>
</div>