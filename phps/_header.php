<?php $slug = get_post_field( 'post_name', get_post() ); ?>

<!-- temporarily added "new-" to prevent .-is-about classes from taking effect -->
<header class="header -is-<?php echo "new-".$slug ?>" role="banner" id="header">
	<nav class="nav" id="nav">


		<?php
			$prev = "#";
			$next = "#";

			if( is_single() || is_page() ) {
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


		<a href=<?php echo $next;?> class="nav__btn -left -chevron">
			<div class="nav__btn-chevron"></div>
		</a>


		<button class="nav__btn -center -ham" id="btnHam">
			<div class="nav__btn-ham"></div>
		</button>

		<a href=<?php echo $prev;?> class="nav__btn -right -chevron">
			<div class="nav__btn-chevron"></div>
		</a>

	</nav>
	<div class="header__logo" id="headerLogo">
		<img src="<?php echo get_bloginfo('template_directory'); ?>/public/assets/svgs/feelings-horizontal-small.svg" alt="feelings" class="header__logo-theme">
		<a href="<?php echo get_bloginfo('url'); ?>" class="header__logo-link">
			<img src="<?php echo get_bloginfo('template_directory'); ?>/public/assets/logo.svg" alt="logo" class="header__logo-img">
		</a>
	</div>
</header>

<div class="header-theme-logo" id="headerThemeLogo">
	<img src="<?php echo get_bloginfo('template_directory'); ?>/public/assets/svgs/feelings-horizontal-big.svg" alt="feelings" class="header-theme-logo__img">
</div>
