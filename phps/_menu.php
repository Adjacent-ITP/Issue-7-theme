<menu class="menu" id="menu">
	<div class="menu__row -big -top">
	  <?php $count = 0; ?>
		<?php while (have_posts()) : ?>
			<?php the_post(); $count++; ?>
			<div class="menu__cell">
				<a href="<?php the_permalink(); ?>" class="menu__cell-post menu-post">
					<img
						src="<?php echo get_bloginfo('template_directory'); ?>/public/assets/number_<?php echo $count;?>.svg"
						alt="<?php echo $count;?>"
						class="menu-post__number"
					>
					<div class="menu-post__text">
						<p class="menu-post__title"><?php the_title(); ?></p>
						<p class="menu-post__author">By <?php the_field('author_name') ?></p>
					</div>
				</a>
			</div>
			<?php if($count == 3): ?>
			<div class="menu__cell -small">
				<a href="#" class="menu__cell-post menu-post -small">
					<p class="menu-post__title">About</p>
				</a>
			</div>
			<div class="menu__cell -small">
				<a href="#" class="menu__cell-post menu-post -small">
					<p class="menu-post__title">Previous Issues</p>
				</a>
			</div>
			<div class="menu__cell -small">
				<a href="#" class="menu__cell-post menu-post -small">
					<p class="menu-post__title">Submit</p>
				</a>
			</div>
			<?php endif; ?>
  	<?php endwhile; ?>
		<!-- <div class="menu__cell"></div>
		<div class="menu__cell"></div> -->
	</div>
	<!-- <div class="menu__row -small -center">
		<div class="menu__cell"></div>
		<div class="menu__cell"></div>
		<div class="menu__cell"></div>
	</div>
	<div class="menu__row -big -btm">
		<div class="menu__cell"></div>
		<div class="menu__cell"></div>
		<div class="menu__cell"></div>
	</div> -->
</menu>