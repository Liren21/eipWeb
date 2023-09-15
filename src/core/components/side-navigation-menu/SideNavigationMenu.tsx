import React, {useEffect, useRef, useCallback} from 'react';
import TreeView, {TreeViewTypes} from 'devextreme-react/tree-view';
import {navigation} from '../../../app/components/App/app-navigation';
import {useNavigation} from '../../lib/contexts/navigation';
import './SideNavigationMenu.scss';
import * as events from 'devextreme/events';


interface SideNavigationMenuProps {
    selectedItemChanged: (e: TreeViewTypes.ItemClickEvent) => void;
    openMenu: (e: React.PointerEvent) => void;
    compactMode: boolean;
    onMenuReady: (e: TreeViewTypes.ContentReadyEvent) => void;
}

export default function SideNavigationMenu(props: React.PropsWithChildren<SideNavigationMenuProps>) {
    const {
        children,
        selectedItemChanged,
        openMenu,
        compactMode,
        onMenuReady
    } = props;

    const {navigationData: {currentPath}} = useNavigation();

    const treeViewRef = useRef<TreeView>(null);
    const wrapperRef = useRef<HTMLDivElement>();
    const getWrapperRef = useCallback((element: HTMLDivElement) => {
        const prevElement = wrapperRef.current;
        if (prevElement) {
            events.off(prevElement, 'dxclick');
        }

        wrapperRef.current = element;
        events.on(element, 'dxclick', (e: React.PointerEvent) => {
            openMenu(e);
        });
    }, [openMenu]);

    useEffect(() => {
        const treeView = treeViewRef.current && treeViewRef.current.instance;
        if (!treeView) {
            return;
        }

        if (currentPath !== undefined) {
            treeView.selectItem(currentPath);
            treeView.expandItem(currentPath);
        }

        if (compactMode) {
            treeView.collapseAll();
        }
    }, [currentPath, compactMode]);

    return (
        <div
            className={'dx-swatch-additional side-navigation-menu'}
            ref={getWrapperRef}
        >
            {children}
            <div className={'menu-container'}>
                <TreeView
                    expandNodesRecursive={false}
                    ref={treeViewRef}
                    items={navigation}
                    keyExpr={'path'}
                    selectionMode={'single'}
                    focusStateEnabled={false}
                    expandEvent={'click'}
                    onItemClick={selectedItemChanged}
                    onContentReady={onMenuReady}
                    width={'100%'}
                />
            </div>
        </div>
    );
}
