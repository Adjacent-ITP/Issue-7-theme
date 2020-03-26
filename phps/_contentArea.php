<div class="content-area" id="contentArea">

	<?php get_template_part( './phps/_menu' ); ?>

	<div class="content-area__main">
	<?php
		if(is_home()) { get_template_part( './phps/_content-homepage' ); }
		elseif(is_single()) { get_template_part( './phps/_content-single' ); }
		elseif(is_page()) { get_template_part( './phps/_content-page' ); }
	?>
	</div>

</div>
