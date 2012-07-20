# Create a StatusBar App

- category: work
- date: 2012-07-20 21:15
- tags: learning, cocoa

--------------------------

It has been months since I decided to learn cocoa development, but in vain.
Unlike python, the documentation of cocoa tortures me a lot.

I am still new to cocoa development. And this post will be part of my learning series.
I didn't mean to teach you anything, on the contrary, it is a track of my learing.
But it may be a little help to you.


## StatusBar App

A **StatusBar App** is what on the right side of the menu bar, it doesn't contain a main window.
For example, the volumn control is a StatusBar App.


## Demo Time

It's the time to create a StatusBar App now.

1. Open your Xcode (I am on Xcode 4.3.3)

2. Create a cocoa application project

    ![create a project](https://github.com/lepture/StatusBarApp/raw/master/assets/Step1.jpg)

3. Name the project **StatusBarApp**

4. Run for testing

Now you will get an App with window. However, our app is a StatusBar App, it has no window.

The final app should be like:

![application](https://github.com/lepture/StatusBarApp/raw/master/assets/application.jpg)

### Menu

We will create the menu first.

1. Drag a menu to the interface builder

    ![drag a menu](https://github.com/lepture/StatusBarApp/raw/master/assets/Step2.jpg)

2. Edit the menu item

    ![edit menu item](https://github.com/lepture/StatusBarApp/raw/master/assets/Step3.jpg)

3. Decorate the menu with seprator

    ![decorate with seprator](https://github.com/lepture/StatusBarApp/raw/master/assets/Step4.jpg)

4. Connect the menu to your code outlet

    ![connect menu outlet](https://github.com/lepture/StatusBarApp/raw/master/assets/Step5.jpg)


### StatusBar

Create the statusBar property in your ``AppDelegate.h`` file:

```objc
@property (strong, nonatomic) NSStatusItem *statusBar;
```

Synthesize it in the ``AppDelegate.m`` file:

```objc
@synthesize statusBar = _statusBar;
```

Initialize the statusBar:

```objc
- (void) awakeFromNib {
    self.statusBar = [[NSStatusBar systemStatusBar] statusItemWithLength:NSVariableStatusItemLength];

    self.statusBar.title = @"G";

    // you can also set an image
    //self.statusBar.image =

    self.statusBar.menu = self.statusMenu;
    self.statusBar.highlightMode = YES;
}
```

``awakeFromNib`` is earlier than ``applicationDidFinishLaunching`` in the lifecycle.


### App Go

Let's test this application.

1. Run you app now. You will see a **G** in the menu bar.
2. Delete the useless window in your ``MainMenu.xib``, and run your app again.

It works! But it doesn't work the right way. It is on the dock, it shows the menu on the left.

Fix it in ``StatusBarApp-Info.plist``, add a row:

```
Application is agent (UIElement)  = YES
```

![connect menu outlet](https://github.com/lepture/StatusBarApp/raw/master/assets/Step6.jpg)

Run your application again, it won't be on the dock, it won't show the menu.

### Do More

But you can't quit the application, that could be annoying. We did have a Quit item on the application, but it won't work right now.

Fix it:

![quit](https://github.com/lepture/StatusBarApp/raw/master/assets/Step7.jpg)

## Source Code

Get the latest source code at [GitHub](https://github.com/lepture/StatusBarApp).

Follow me on [GitHub](https://github.com/lepture).

## Reference:

- [Creating a Status Bar Application](http://cocoatutorial.grapewave.com/2010/01/creating-a-status-bar-application/)
- [NSStatusItem Class Reference](https://developer.apple.com/library/mac/#documentation/Cocoa/Reference/ApplicationKit/Classes/NSStatusItem_Class/Reference/Reference.html)
