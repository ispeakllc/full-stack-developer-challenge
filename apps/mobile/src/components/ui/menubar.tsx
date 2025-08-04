import type { TextProps } from 'react-native';
import * as React from 'react';
import { Platform, Text, View } from 'react-native';
import { TextClassContext } from '@/components/ui/text';
import { Check } from '@/lib/icons/Check';
import { ChevronDown } from '@/lib/icons/ChevronDown';
import { ChevronRight } from '@/lib/icons/ChevronRight';
import { ChevronUp } from '@/lib/icons/ChevronUp';
import * as MenubarPrimitive from '@rn-primitives/menubar';

import { cn } from '../../utils/react-native-reusables';

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

function Menubar({
  className,
  ...props
}: MenubarPrimitive.RootProps & {
  ref?: React.RefObject<MenubarPrimitive.RootRef>;
}) {
  return (
    <MenubarPrimitive.Root
      className={cn(
        'native:h-12 border-border bg-background flex h-10 flex-row items-center space-x-1 rounded-md border p-1',
        className,
      )}
      {...props}
    />
  );
}

function MenubarTrigger({
  className,
  ...props
}: MenubarPrimitive.TriggerProps & {
  ref?: React.RefObject<MenubarPrimitive.TriggerRef>;
}) {
  const { value } = MenubarPrimitive.useRootContext();
  const { value: itemValue } = MenubarPrimitive.useMenuContext();

  return (
    <MenubarPrimitive.Trigger
      className={cn(
        'web:cursor-default web:select-none native:h-10 native:px-5 native:py-0 web:outline-none web:focus:bg-accent active:bg-accent web:focus:text-accent-foreground flex flex-row items-center rounded-sm px-3 py-1.5 text-sm font-medium',
        value === itemValue && 'bg-accent text-accent-foreground',
        className,
      )}
      {...props}
    />
  );
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenubarPrimitive.SubTriggerProps & {
  ref?: React.RefObject<MenubarPrimitive.SubTriggerRef>;
  className?: string;
  inset?: boolean;
  children?: React.ReactNode;
}) {
  const { open } = MenubarPrimitive.useSubContext();
  const Icon =
    Platform.OS === 'web' ? ChevronRight : open ? ChevronUp : ChevronDown;
  return (
    <TextClassContext.Provider
      value={cn(
        'native:text-lg text-primary select-none text-sm',
        open && 'native:text-accent-foreground',
      )}
    >
      <MenubarPrimitive.SubTrigger
        className={cn(
          'web:cursor-default web:select-none web:focus:bg-accent active:bg-accent web:hover:bg-accent native:py-2 web:outline-none flex flex-row items-center gap-2 rounded-sm px-2 py-1.5',
          open && 'bg-accent',
          inset && 'pl-8',
          className,
        )}
        {...props}
      >
        {children}
        <Icon size={18} className="text-foreground ml-auto" />
      </MenubarPrimitive.SubTrigger>
    </TextClassContext.Provider>
  );
}

function MenubarSubContent({
  className,
  ...props
}: MenubarPrimitive.SubContentProps & {
  ref?: React.RefObject<MenubarPrimitive.SubContentRef>;
}) {
  const { open } = MenubarPrimitive.useSubContext();
  return (
    <MenubarPrimitive.SubContent
      className={cn(
        'border-border bg-popover shadow-foreground/5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md',
        open
          ? 'web:animate-in web:fade-in-0 web:zoom-in-95'
          : 'web:animate-out web:fade-out-0 web:zoom-out',
        className,
      )}
      {...props}
    />
  );
}

function MenubarContent({
  className,
  portalHost,
  ...props
}: MenubarPrimitive.ContentProps & {
  ref?: React.RefObject<MenubarPrimitive.ContentRef>;
  className?: string;
  portalHost?: string;
}) {
  const { value } = MenubarPrimitive.useRootContext();
  const { value: itemValue } = MenubarPrimitive.useMenuContext();
  return (
    <MenubarPrimitive.Portal hostName={portalHost}>
      <MenubarPrimitive.Content
        className={cn(
          'border-border bg-popover shadow-foreground/5 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md',
          value === itemValue
            ? 'web:animate-in web:fade-in-0 web:zoom-in-95'
            : 'web:animate-out web:fade-out-0 web:zoom-out-95',
          className,
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  );
}

function MenubarItem({
  className,
  inset,
  ...props
}: MenubarPrimitive.ItemProps & {
  ref?: React.RefObject<MenubarPrimitive.ItemRef>;
  className?: string;
  inset?: boolean;
}) {
  return (
    <TextClassContext.Provider value="select-none text-sm native:text-lg text-popover-foreground web:group-focus:text-accent-foreground">
      <MenubarPrimitive.Item
        className={cn(
          'web:cursor-default native:py-2 web:outline-none web:focus:bg-accent active:bg-accent web:hover:bg-accent group relative flex flex-row items-center gap-2 rounded-sm px-2 py-1.5',
          inset && 'pl-8',
          props.disabled && 'web:pointer-events-none opacity-50',
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: MenubarPrimitive.CheckboxItemProps & {
  ref?: React.RefObject<MenubarPrimitive.CheckboxItemRef>;
  children?: React.ReactNode;
}) {
  return (
    <MenubarPrimitive.CheckboxItem
      className={cn(
        'web:cursor-default web:group native:py-2 web:outline-none web:focus:bg-accent active:bg-accent relative flex flex-row items-center rounded-sm py-1.5 pl-8 pr-2',
        props.disabled && 'web:pointer-events-none opacity-50',
        className,
      )}
      checked={checked}
      {...props}
    >
      <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check size={14} strokeWidth={3} className="text-foreground" />
        </MenubarPrimitive.ItemIndicator>
      </View>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: MenubarPrimitive.RadioItemProps & {
  ref?: React.RefObject<MenubarPrimitive.RadioItemRef>;
  children?: React.ReactNode;
}) {
  return (
    <MenubarPrimitive.RadioItem
      className={cn(
        'web:cursor-default web:group native:py-2 web:outline-none web:focus:bg-accent active:bg-accent relative flex flex-row items-center rounded-sm py-1.5 pl-8 pr-2',
        props.disabled && 'web:pointer-events-none opacity-50',
        className,
      )}
      {...props}
    >
      <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <View className="bg-foreground h-2 w-2 rounded-full" />
        </MenubarPrimitive.ItemIndicator>
      </View>
      {children}
    </MenubarPrimitive.RadioItem>
  );
}

function MenubarLabel({
  className,
  inset,
  ...props
}: MenubarPrimitive.LabelProps & {
  ref?: React.RefObject<MenubarPrimitive.LabelRef>;
  className?: string;
  inset?: boolean;
}) {
  return (
    <MenubarPrimitive.Label
      className={cn(
        'native:text-base text-foreground web:cursor-default px-2 py-1.5 text-sm font-semibold',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ...props
}: MenubarPrimitive.SeparatorProps & {
  ref?: React.RefObject<MenubarPrimitive.SeparatorRef>;
}) {
  return (
    <MenubarPrimitive.Separator
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

function MenubarShortcut({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn(
        'native:text-sm text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  );
}

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};
