import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { PanelBody, CheckboxControl, TextControl } from "@wordpress/components";
import { SOCIAL_ICONS } from "./constants/socialIcons";
import { useEffect, useState } from "@wordpress/element";
import { usePrevious } from "@wordpress/compose";
import "./editor.scss";

export default function Edit({ attributes, setAttributes, isSelected }) {
	const { sectionTitle, sectionDescription, selectedIcons } = attributes;

	const [selectedLink, setSelectedLink] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleChangeSectionTitle = (newSectionTitle) => {
		setAttributes({ sectionTitle: newSectionTitle });
	};

	const handleChangeSectionDescription = (newSectionDescription) => {
		setAttributes({ sectionDescription: newSectionDescription });
	};

	const onIconChange = (newIcons) => {
		setAttributes({ selectedIcons: newIcons });
	};

	const handleLinkToggle = (icon) => {
		setSelectedLink(icon);
		setIsOpen(true);
	};

	const handleChangeIconLink = (newLink, icon) => {
		const updatedIcons = selectedIcons.map((i) =>
			i.name === icon.name ? { ...i, link: newLink } : i,
		);
		setAttributes({ selectedIcons: updatedIcons });
	};

	return (
		<div {...useBlockProps()}>
			<div>
				<RichText
					placeholder={__("Footer Title", "form-section")}
					tagName="h2"
					value={sectionTitle}
					onChange={handleChangeSectionTitle}
					allowedFormats={[]}
				/>
				<RichText
					placeholder={__("Footer Description", "form-section")}
					tagName="p"
					value={sectionDescription}
					onChange={handleChangeSectionDescription}
					allowedFormats={[]}
				/>
			</div>
			<div className="wp-block-form-section-icon-container">
				{selectedIcons.length > 0 && (
					<>
						<ul className="wp-block-form-section-list">
							{selectedIcons.map((icon, index) => (
								<li className="wp-block-form-section-list-item" key={icon.name}>
									<button onClick={() => handleLinkToggle(icon)}>
										<img
											style={{ width: "20px" }}
											src={icon.src}
											alt={icon.name}
										/>
									</button>
								</li>
							))}
						</ul>
						<div>
							{selectedIcons.map((icon) => (
								<div key={icon.name}>
									{isOpen && selectedLink.name === icon.name && (
										<TextControl
											label={__(`Social link for ${icon.name}`, "form-section")}
											value={icon.link || ""}
											onChange={(newLink) =>
												handleChangeIconLink(newLink, icon)
											}
										/>
									)}
								</div>
							))}
						</div>
					</>
				)}
				<PanelBody title={__("Select social icons", "form-section")}>
					{SOCIAL_ICONS.map((icon) => (
						<div key={icon.name}>
							<CheckboxControl
								label={icon.name}
								checked={selectedIcons.some((i) => i.name === icon.name)}
								onChange={(checked) =>
									onIconChange(
										checked
											? [...selectedIcons, icon]
											: selectedIcons.filter((i) => i.name !== icon.name),
									)
								}
							/>
						</div>
					))}
				</PanelBody>
			</div>
		</div>
	);
}
