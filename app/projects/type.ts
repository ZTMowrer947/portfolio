/**
 * Represents data relating to an image.
 */
export interface ImageData {
  /**
   * The unique ID of the image.
   */
  id: string;

  /**
   * The URL of the image.
   */
  src: string;

  /**
   * The alt label text for if the image cannot be displayed.
   */
  altText: string;

  /**
   * The width of the image in pixels.
   */
  width: number;

  /**
   * The height of the image in pixels.
   */
  height: number;
}

/**
 * Represents a project to be shown of on the portfolio.
 */
export interface Project {
  /**
   * The unique ID of the project.
   */
  id: string;

  /**
   * The title of the project.
   */
  title: string;

  /**
   * The Markdown-formatted description of the project.
   */
  description: string;

  /**
   * The list of tags associated with the project.
   */
  tags: string[];

  /**
   * An optional link to the project's source code.
   */
  sourceLink?: string;

  /**
   * An optional link to a live demo of the project.
   */
  liveLink?: string;

  /**
   * An array of image data objects.
   */
  images: ImageData[];
}
