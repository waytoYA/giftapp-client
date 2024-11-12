import { useNavigate } from 'react-router-dom';
import { backButton, mainButton as tgMainButton, secondaryButton as tgSecondaryButton} from '@telegram-apps/sdk-react';
import { PropsWithChildren, useEffect } from 'react';

export function Page({
    children,
    back = true,
    mainButton,
    secondaryButton
}: PropsWithChildren<{
    /**
     * @back True if it is allowed to go back from this page.
     * @mainButton Do I need the mainButton tg-sdk on the page
     * @secondaryButton Do I need the secondaryButton tg-sdk on the page
     */
    back?: boolean,
    mainButton?: {
        text: string;
        onClick: () => void;
    };
    secondaryButton?: {
        text: string;
        onClick: () => void;
    };
}>) {
  const navigate = useNavigate();

    useEffect(() => {
        if (back) {
            backButton.show();
            return backButton.onClick(() => {
                navigate(-1);
            });
        }
        backButton.hide();
    }, [back]);

    useEffect(() => {
        if (mainButton) {
            tgMainButton.mount();
            tgMainButton.setParams({
                backgroundColor: '#007AFF',
                textColor: '#ffffff',
                isEnabled: true,
                isVisible: true,
                text: mainButton.text,
            });
            tgMainButton.onClick(mainButton.onClick)

            return () => {
                tgMainButton.setParams({ isVisible: false, isEnabled: false })
                tgMainButton.offClick(mainButton.onClick)
            }
        }
    }, [mainButton]);

    useEffect(() => {
        if (secondaryButton) {
            tgSecondaryButton.mount();
            tgSecondaryButton.setParams({
                backgroundColor: '#F1F1F2',
                textColor: '#007AFF',
                isEnabled: true,
                isVisible: true,
                position: "bottom",
                text: secondaryButton.text,
            });
            tgSecondaryButton.onClick(secondaryButton.onClick)

            return () => {
                tgSecondaryButton.setParams({ isVisible: false, isEnabled: false })
                tgSecondaryButton.offClick(secondaryButton.onClick)

            }
        }
    }, [secondaryButton]);

    return <>{children}</>;
}