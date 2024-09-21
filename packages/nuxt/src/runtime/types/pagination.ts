import type { PaginationEllipsisProps, PaginationFirstProps, PaginationLastProps, PaginationListItemProps, PaginationListProps, PaginationNextProps, PaginationPrevProps, PaginationRootProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import type { NButtonProps } from './button'

interface BaseExtensionProps {
  class?: HTMLAttributes['class']
  rounded?: HTMLAttributes['class']
  size?: HTMLAttributes['class']
}

type isVisible = boolean

export interface NPaginationProps extends
  PaginationRootProps,
  BaseExtensionProps,
  Pick<NButtonProps, 'paginationSelected' | 'paginationUnselected'>,
  Pick<NPaginationEllipsisProps, 'paginationEllipsis'> {
  showFirst?: isVisible
  showPrev?: isVisible
  showNext?: isVisible
  showLast?: isVisible
  showListItem?: isVisible

  // sub-components
  _paginationList?: Partial<NPaginationListProps>
  _paginationListItem?: Partial<NPaginationListItemProps>
  _paginationEllipsis?: Partial<NPaginationEllipsisProps>
  _paginationFirst?: Partial<NPaginationFirstProps>
  _paginationPrev?: Partial<NPaginationPrevProps>
  _paginationNext?: Partial<NPaginationNextProps>
  _paginationLast?: Partial<NPaginationLastProps>

  una?: {
    paginationRoot: HTMLAttributes['class']
    paginationList?: HTMLAttributes['class']
  }
}

export interface NPaginationListProps extends PaginationListProps, BaseExtensionProps {
  una?: {
    paginationList?: HTMLAttributes['class']
  }
}

export interface NPaginationListItemProps extends PaginationListItemProps, NButtonProps {
  page?: PaginationRootProps['page']
}

export interface NPaginationEllipsisProps extends PaginationEllipsisProps, BaseExtensionProps {
  paginationEllipsis?: HTMLAttributes['class']

  una?: {
    paginationEllipsis?: HTMLAttributes['class']
    paginationEllipsisIconBase?: HTMLAttributes['class']
    paginationEllipsisIcon?: HTMLAttributes['class']
  }
}

export interface NPaginationFirstProps extends PaginationFirstProps, NButtonProps {
  // una?: {
  //   paginationFirst?: HTMLAttributes['class']
  //   paginationFirstIcon?: HTMLAttributes['class']
  // }
}

export interface NPaginationPrevProps extends PaginationPrevProps, NButtonProps {
  // una?: {
  //   paginationPrev?: HTMLAttributes['class']
  //   paginationPrevIcon?: HTMLAttributes['class']
  // }
}

export interface NPaginationNextProps extends PaginationNextProps, NButtonProps {
  // una?: {
  //   paginationNext?: HTMLAttributes['class']
  //   paginationNextIcon?: HTMLAttributes['class']
  // }
}

export interface NPaginationLastProps extends PaginationLastProps, NButtonProps {
  // una?: {
  //   paginationLast?: HTMLAttributes['class']
  //   paginationLastIcon?: HTMLAttributes['class']
  // }
}