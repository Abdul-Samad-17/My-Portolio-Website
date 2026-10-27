import { toast } from "@/components/ui/sonner";
import { personalInfo } from "@/data/portfolio";

export function getGmailComposeUrl(email: string = personalInfo.email): string {
  return `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}`;
}

/**
 * Robust handler for email actions:
 * 1. Attempts the standard mailto: link (via a programmatic click).
 * 2. Copies the email address to clipboard as a reliable fallback.
 * 3. Shows a toast confirming the copy, complete with a 1-click "Open in Gmail" action.
 */
export function openEmailAction(
  email: string = personalInfo.email,
  event?: React.MouseEvent | React.KeyboardEvent | Event
): void {
  if (event && "preventDefault" in event) {
    event.preventDefault();
  }

  // 1. Try mailto navigation
  try {
    const a = document.createElement("a");
    a.href = `mailto:${email}`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch {
    // Ignore mailto dispatch errors
  }

  // 2. Copy address to clipboard
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(email).catch(() => {
      // Ignore clipboard write errors (e.g. if permissions restricted)
    });
  }

  // 3. Show "Copied" toast with "Open in Gmail" option
  const gmailUrl = getGmailComposeUrl(email);
  toast.success("Email copied to clipboard!", {
    description: email,
    action: {
      label: "Open in Gmail",
      onClick: () => {
        window.open(gmailUrl, "_blank", "noopener,noreferrer");
      },
    },
    duration: 6000,
  });
}
