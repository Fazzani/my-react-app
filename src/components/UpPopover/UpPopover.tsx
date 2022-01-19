import { FC, PropsWithChildren, ReactNode, useState } from 'react';
import { UpBox, UpButton, withTheme, WithThemeProps } from '@up-group-ui/react-controls';
import { Popover, ArrowContainer } from 'react-tiny-popover';
import { style } from 'typestyle';
import { ThemeInterface } from '@up-group-ui/react-controls/dist/Common/theming/types';

interface UpPopoverProps {
  title: string;
  disabled: boolean;
  onSave?: Function;
  children: ReactNode;
  buttonTitle: string
}

const UpPopover: FC<PropsWithChildren<UpPopoverProps> & WithThemeProps> = ({ buttonTitle, title, disabled, onSave, theme, children }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const toggleOpen = () => setPopoverOpen(!isPopoverOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit');
    onSave();
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['top']}
      align="center"
      onClickOutside={toggleOpen}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer className={containerClass(theme)} position={position} childRect={childRect} popoverRect={popoverRect} arrowColor={theme.colorMap.disabledFg} arrowSize={10}>
          <UpBox alignItems="center" backgroundColor={theme.colorMap.white} className="content-editable__container">
            <UpBox style={{ padding: '0.5em' }}>
              {title}
              <span className={closeBtnClass(theme)} onClick={(e) => setPopoverOpen(false)}>
                &times;
              </span>
            </UpBox>
            <UpBox>
              <UpButton intent="primary" type="button" onClick={handleSubmit} disabled={disabled}>
                {buttonTitle}
              </UpButton>
            </UpBox>
          </UpBox>
        </ArrowContainer>
      )}>
      <span onClick={toggleOpen}>{children}</span>
    </Popover>
  );
};

export default withTheme<UpPopoverProps>(UpPopover);

const closeBtnClass = (theme: ThemeInterface) => style({
  cursor: 'pointer',
  float: 'right',
  display: 'block',
  width: '18px',
  textAlign: 'center',
  backgroundColor: theme.colorMap.gray1,
  color: theme.colorMap.primaryFg,
  borderRadius: '0.35em',
  padding: '0.5em',
});

const containerClass = (theme: ThemeInterface) =>
  style({
    borderRadius: '0.35em',
    textAlign: 'center',
    boxShadow: `0px 6px 12px ${theme.colorMap.black3}`,
    padding: '.7em',
    width: 'fit-content',
  });
