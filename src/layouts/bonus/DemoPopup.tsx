import {
  type PopupContentProps,
  Popup,
  PopupToggler,
  PopupContent,
} from "../../components/Popup";

const popupVerticalDirections: PopupContentProps["verticalDirection"][] = [
  "top",
  "bottom",
  "center",
];

const popupHorizontalDirections: PopupContentProps["horizontalDirection"][] = [
  "right",
  "center",
  "left",
];

export function DemoPopup() {
  return (
    <>
      <h1 className="text-2xl font-bold uppercase tracking-wide">Popup</h1>
      <div className="flex flex-col items-center gap-6">
        {popupVerticalDirections.map((popupVerticalDirection) => (
          <div key={popupVerticalDirection} className="grid gap-2">
            <h2 className="text-lg uppercase tracking-wide">
              Horizontal direction {popupVerticalDirection}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {popupHorizontalDirections.map((popupHorizontalDirection) => (
                <Popup key={popupHorizontalDirection}>
                  <PopupToggler>Toggle {popupHorizontalDirection}</PopupToggler>
                  <PopupContent
                    verticalDirection={popupVerticalDirection}
                    horizontalDirection={popupHorizontalDirection}
                    className="min-w-96 rounded-lg bg-primary-50 p-4 text-primary-800 dark:bg-primary-900 dark:text-primary-50"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                    molestias recusandae perspiciatis minima asperiores
                    adipisci? Culpa placeat atque, tempore autem ut pariatur,
                    minima voluptatem provident necessitatibus eveniet eaque?
                    Quisquam, quo natus. Magni, error cumque voluptates ratione
                    nemo repudiandae in delectus mollitia unde quae sequi
                    excepturi incidunt quod enim pariatur inventore.
                  </PopupContent>
                </Popup>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
