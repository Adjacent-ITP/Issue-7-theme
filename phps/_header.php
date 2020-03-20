<header class="header" role="banner">
	<nav class="nav" id="nav">


		<?php
			$prev = "#";
			$next = "#";
			// if it's a post page, set $next and $prev to the URLs of next and prev posts
			// what should happen if its a static page? ie an about page.. ?
			if( is_single() ) {
				if( get_adjacent_post(false, '', true) ) {
					$prev = get_permalink(get_previous_post()->ID);
				} else {
					$first = new WP_Query('posts_per_page=1&order=DESC'); $first->the_post();
					$prev = get_permalink();
					wp_reset_query();
				};

				if( get_adjacent_post(false, '', false) ) {
					$next = get_permalink(get_next_post()->ID);
				} else {
					$last = new WP_Query('posts_per_page=1&order=ASC'); $last->the_post();
					$next = get_permalink();
					wp_reset_query();
				};
			}
		?>

		<!-- changed buttons to A tags for minimal HTML changes between homepage and post page
		just the least destructive solution for now, feel free to change. -->
		<a href=<?php echo $prev;?> class="nav__btn -left -chevron">
			<div class="nav__btn-chevron"></div>
		</a>

		<button class="nav__btn -center -ham" id="btnHam">
			<div class="nav__btn-ham"></div>
		</button>

		<a href=<?php echo $next;?> class="nav__btn -right -chevron">
			<div class="nav__btn-chevron"></div>
		</a>

	</nav>
	<div class="header__logo">
		<a href="#" class="header__logo-link">
			<img src="<?php echo get_bloginfo('template_directory'); ?>/public/assets/logo.png" alt="logo" class="header__logo-img">
		</a>
	</div>
</header>
