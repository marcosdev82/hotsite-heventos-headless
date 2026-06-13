(function (wp) {
  if (!wp || !wp.hooks || !wp.compose || !wp.element || !wp.components) {
    return;
  }

  const targetBlock = 'core/button';
  const { __ } = wp.i18n;
  const { addFilter } = wp.hooks;
  const { createHigherOrderComponent } = wp.compose;
  const { Fragment, createElement } = wp.element;
  const { InspectorControls } = wp.blockEditor || wp.editor;
  const { PanelBody, SelectControl } = wp.components;

  const customAttributes = {
    heventosButtonColor: { type: 'string', default: '' },
    heventosButtonVariant: { type: 'string', default: '' },
    heventosButtonShape: { type: 'string', default: '' },
    heventosButtonSize: { type: 'string', default: '' },
    heventosButtonHover: { type: 'string', default: '' },
  };

  const controlOptions = {
    color: [
      { label: __('Default', 'heventos'), value: '' },
      { label: __('Primary', 'heventos'), value: 'primary' },
      { label: __('Secondary', 'heventos'), value: 'secondary' },
      { label: __('Success', 'heventos'), value: 'success' },
      { label: __('Danger', 'heventos'), value: 'danger' },
      { label: __('Warning', 'heventos'), value: 'warning' },
      { label: __('Info', 'heventos'), value: 'info' },
      { label: __('Light', 'heventos'), value: 'light' },
      { label: __('Dark', 'heventos'), value: 'dark' },
      { label: __('Link', 'heventos'), value: 'link' },
    ],
    variant: [
      { label: __('Default', 'heventos'), value: '' },
      { label: __('Outline', 'heventos'), value: 'outline' },
      { label: __('Outline Secondary', 'heventos'), value: 'outline-secondary' },
      { label: __('Outline Light', 'heventos'), value: 'outline-light' },
      { label: __('Ghost', 'heventos'), value: 'ghost' },
    ],
    shape: [
      { label: __('Default', 'heventos'), value: '' },
      { label: __('Pill', 'heventos'), value: 'pill' },
      { label: __('Square', 'heventos'), value: 'square' },
    ],
    size: [
      { label: __('Default', 'heventos'), value: '' },
      { label: __('Small', 'heventos'), value: 'size-sm' },
      { label: __('Medium', 'heventos'), value: 'size-md' },
      { label: __('Large', 'heventos'), value: 'size-lg' },
      { label: __('XL', 'heventos'), value: 'size-xl' },
    ],
    hover: [
      { label: __('Default', 'heventos'), value: '' },
      { label: __('Lift', 'heventos'), value: 'hover-lift' },
      { label: __('Glow', 'heventos'), value: 'hover-glow' },
      { label: __('Sweep', 'heventos'), value: 'hover-sweep' },
    ],
  };

  function getButtonClasses(attributes) {
    return [
      attributes.heventosButtonColor && `btn-${attributes.heventosButtonColor}`,
      attributes.heventosButtonVariant && `btn-${attributes.heventosButtonVariant}`,
      attributes.heventosButtonShape && `btn-${attributes.heventosButtonShape}`,
      attributes.heventosButtonSize && `btn-${attributes.heventosButtonSize}`,
      attributes.heventosButtonHover && `btn-${attributes.heventosButtonHover}`,
    ].filter(Boolean).join(' ');
  }

  function addButtonAttributes(settings, name) {
    if (name !== targetBlock) {
      return settings;
    }

    return {
      ...settings,
      attributes: {
        ...settings.attributes,
        ...customAttributes,
      },
    };
  }

  addFilter('blocks.registerBlockType', 'heventos/button-attributes', addButtonAttributes);

  const withButtonInspectorControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
      if (props.name !== targetBlock) {
        return createElement(BlockEdit, props);
      }

      const { attributes, setAttributes } = props;

      return createElement(
        Fragment,
        null,
        createElement(BlockEdit, props),
        createElement(
          InspectorControls,
          null,
          createElement(
            PanelBody,
            { title: __('Heventos Button', 'heventos'), initialOpen: true },
            createElement(SelectControl, {
              label: __('Color', 'heventos'),
              value: attributes.heventosButtonColor,
              options: controlOptions.color,
              onChange: (value) => setAttributes({ heventosButtonColor: value }),
            }),
            createElement(SelectControl, {
              label: __('Variant', 'heventos'),
              value: attributes.heventosButtonVariant,
              options: controlOptions.variant,
              onChange: (value) => setAttributes({ heventosButtonVariant: value }),
            }),
            createElement(SelectControl, {
              label: __('Shape', 'heventos'),
              value: attributes.heventosButtonShape,
              options: controlOptions.shape,
              onChange: (value) => setAttributes({ heventosButtonShape: value }),
            }),
            createElement(SelectControl, {
              label: __('Size', 'heventos'),
              value: attributes.heventosButtonSize,
              options: controlOptions.size,
              onChange: (value) => setAttributes({ heventosButtonSize: value }),
            }),
            createElement(SelectControl, {
              label: __('Hover', 'heventos'),
              value: attributes.heventosButtonHover,
              options: controlOptions.hover,
              onChange: (value) => setAttributes({ heventosButtonHover: value }),
            })
          )
        )
      );
    };
  }, 'withHeventosButtonInspectorControls');

  addFilter('editor.BlockEdit', 'heventos/button-inspector-controls', withButtonInspectorControls);

  function addButtonSaveClasses(extraProps, blockType, attributes) {
    if (blockType.name !== targetBlock) {
      return extraProps;
    }

    const classes = getButtonClasses(attributes);

    if (!classes) {
      return extraProps;
    }

    return {
      ...extraProps,
      className: [extraProps.className, classes].filter(Boolean).join(' '),
    };
  }

  addFilter('blocks.getSaveContent.extraProps', 'heventos/button-save-classes', addButtonSaveClasses);

  const withEditorButtonClasses = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
      if (props.name !== targetBlock) {
        return createElement(BlockListBlock, props);
      }

      const classes = getButtonClasses(props.attributes || {});

      return createElement(BlockListBlock, {
        ...props,
        className: [props.className, classes].filter(Boolean).join(' '),
      });
    };
  }, 'withHeventosEditorButtonClasses');

  addFilter('editor.BlockListBlock', 'heventos/button-editor-classes', withEditorButtonClasses);
})(window.wp);