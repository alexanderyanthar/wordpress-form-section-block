import { useBlockProps, RichText } from "@wordpress/block-editor";
export default function save({ attributes }) {
	const { sectionTitle, sectionDescription, selectedIcons } = attributes;

	return (
		<div className="wp-block-form-section" {...useBlockProps.save()}>
			<RichText.Content tagName="h2" value={sectionTitle} />
			<RichText.Content tagName="p" value={sectionDescription} />
			{selectedIcons.length > 0 && (
				<ul className="wp-block-form-section-list">
					{selectedIcons.map((icon) => (
						<li key={icon.name}>
							<a href={icon.link} target="_blank">
								<img style={{ width: "20px" }} src={icon.src} alt={icon.name} />
							</a>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
