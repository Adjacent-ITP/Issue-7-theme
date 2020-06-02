<menu class="menu" id="menu">
	<div class="menu__row -big -top">
		<?php
			$all_posts = get_posts( array('posts_per_page' => 20) );
			setup_postdata( $post );
		?>
			<?php foreach ($all_posts as $key=>$post) : ?>
				<?php if(is_single($post)): ?>
					<div class="menu__cell -active" data-key=<?php echo $key; ?> >
				<?php else: ?>
					<div class="menu__cell" >
				<?php endif; ?>

					<a href="<?php the_permalink(); ?>" class="menu__cell-post menu-post">
						<img
							src="<?php echo get_bloginfo('template_directory'); ?>/public/assets/number_<?php echo ($key+1);?>.svg"
							alt="<?php echo ($key+1);?>"
							class="menu-post__number"
						>
						<img
							src="<?php echo get_bloginfo('template_directory'); ?>/public/assets/numbers_mobile/<?php echo ($key+1);?>_numbers_mobile.svg"
							alt="<?php echo ($key+1);?>"
							class="menu-post__number -mobile"
						>
						<div class="menu-post__text">
							<p class="menu-post__title">
								<?php if(get_field('short_title')): the_field('short_title'); ?>
                <?php else: the_title(); ?>
                <?php endif; ?>
							</p>
							<p class="menu-post__author">By <?php the_field('author_name') ?></p>
						</div>
					</a>
				</div>
				<?php if($key == 2): ?>
				<div class="menu__cell -small">
					<a href="<?php echo get_bloginfo('url'); ?>/about" class="menu__cell-post menu-post -small">
						<p class="menu-post__title">About</p>
					</a>
				</div>
				<div class="menu__cell -small">
					<a href="https://itp.nyu.edu/adjacent" target="_blank" class="menu__cell-post menu-post -small">
						<p class="menu-post__title">Previous Issues</p>
					</a>
				</div>
				<div class="menu__cell -small">
					<a href="https://forms.gle/YH3T8HjcfbqTVoMy5" target="_blank" class="menu__cell-post menu-post -small">
						<p class="menu-post__title">Submit</p>
					</a>
				</div>
				<?php endif; ?>
			<?php
				endforeach;
				wp_reset_postdata();
			?>
	</div>
</menu>
