A [jQuery](http://www.jquery.com/) plugin that allows a group of select dropdowns to share a common set of options, where if one of the options is selected it becomes unavailable in the other select dropdowns.

Example Usage
---------------

You probably want to just [look at the example](https://github.com/znbailey/jQuery-Shared-Options/blob/master/example.html), but if you prefer to read prose instead of code, here goes --

`$('select.shared-options').sharedOptions();

*Note*: Like you'd expect, you may use any jQuery selector for the first call. The plugin is also written to support idiomatic jQuery chain-ability so you can do things like:

`$('select.shared-options').sharedOptions().somethingElse().anotherThing();`

Known Limitations/Shortcomings
---------------

* Currently, only works for select dropdowns that do not allow multiple selections to be made